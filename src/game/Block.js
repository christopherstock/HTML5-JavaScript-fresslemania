/*  $Id: Block.js 31930 2011-08-04 12:29:02Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents one obstacle block the level consists of.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31930 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Block.js $
    *****************************************************************************/
    var     Block                           = new Object();
    {
        Block.BLOCK_TYPE_WALL               = 0;
        Block.BLOCK_TYPE_PLAYER             = 1;
        Block.BLOCK_TYPE_ENEMY              = 2;
        Block.BLOCK_TYPE_ITEM               = 3;

        Block.BLOCK_STATE_STANDING          = 0;
        Block.BLOCK_STATE_JUMPING_UP        = 1;
        Block.BLOCK_STATE_FALLING_DOWN      = 2;

        /* Number of delay ticks between two image-frames. */    
        Block.BLOCK_FRAME_ANIMATION_SPEED   = 5;    
        /* Swing animation in degrees per tick. */
        Block.BLOCK_SWING_ANIMATION_SPEED   = 2;
        Block.BLOCK_ANGLE_MIN               = 0;
        Block.BLOCK_ANGLE_MAX               = 180;
        Block.BLOCK_ANGLE_RADIUS_X          = 20;
        Block.BLOCK_ANGLE_RADIUS_Y          = 35;

        Block.ANGLE_STATE_DECREASING         = 0;
        Block.ANGLE_STATE_INCREASING         = 1;

        Block.constructor = function( x, y, sprite, type, elevated, swings )
        {
            this.sprite                 = sprite;
            this.rect                   = new Rect2D.constructor( x, y, this.sprite.frameWidth, this.sprite.frameHeight );
            this.type                   = type;
            this.elevation              = elevated;
            this.swings                 = swings;

            this.frame                  = 0;
            this.frameDelay             = Block.BLOCK_FRAME_ANIMATION_SPEED;            
            this.state                  = Block.BLOCK_STATE_STANDING;
            this.collision              = false;
            this.jumpDeltaY             = 0;
            this.angle                  = Block.BLOCK_ANGLE_MAX;
            this.angleState             = Block.ANGLE_STATE_DECREASING;       
            
            this.drawBlock              = Block.drawBlock;
            this.checkBlockCollision    = Block.checkBlockCollision;
            this.moveLeft               = Block.moveLeft;
            this.moveRight              = Block.moveRight;
            this.jump                   = Block.jump;
            this.handleY                = Block.handleY;
            this.drawDebugRect          = Block.drawDebugRect;
            this.animateBlock           = Block.animateBlock;
            this.setNewSprite           = Block.setNewSprite;
        }

        Block.drawBlock = function( camera )
        {
            //check if block swings
            if ( this.swings )
            {
                //translate block by swing anchor
                var original = new Point2D.constructor( this.rect.left - camera.x, this.rect.top - camera.y );
                var mod      = UMath.sinCosPoint( original, this.angle, Block.BLOCK_ANGLE_RADIUS_X, Block.BLOCK_ANGLE_RADIUS_Y );
                mod.y       -= Block.BLOCK_ANGLE_RADIUS_Y;
                
                Drawing.drawSpriteObj( this.sprite, mod.x, mod.y, Anchor.LEFT_TOP, this.frame );
            }
            else
            {
                Drawing.drawSpriteObj( this.sprite, this.rect.left - camera.x, this.rect.top - camera.y, Anchor.LEFT_TOP, this.frame );
            }

            //draw debug rects
            if ( Main.DRAW_DEBUG_BLOCKS_PLAYER && this.type == Block.BLOCK_TYPE_PLAYER )
            {
                this.drawDebugRect( camera );                
            }
        }
        
        Block.checkBlockCollision = function( rect )
        {
            //no x/y collision on elevated blocks!
            switch ( this.elevation ) 
            {
                case Rect2D.ELEVATION_NONE:
                {
                    var ret = rect.rectsCollide( this.rect );
                    return ret;
                }
                
                case Rect2D.ELEVATION_ASCENDING:
                {
                    var ret = false;
                    return ret;
                }
                
                case Rect2D.ELEVATION_DESCENDING:
                {
                    var ret = false;
                    return ret;
                }
            }
            
            return false;
        }
        
        Block.moveLeft = function( speed )
        {
            var speedSteps = speed / Settings.BLOCK_COLLISION_CHECK_STEP_X;
            if ( speedSteps < 1 ) speedSteps = 1;
            for ( var i = 0; i < speedSteps; ++i )
            {
                this.rect.left -= speed / speedSteps;
                if ( Level.current.checkLevelCollisions( this.rect ) )
                {
                    this.rect.left += speed / speedSteps;
                    if ( i == speedSteps - 1 ) this.collision = true;
                }
                else
                {
                    this.collision = false;
                }
            }
            
            //bound level
            if ( this.rect.left < 0 ) this.rect.left = 0;
        }

        Block.moveRight = function( speed )
        {
            var speedSteps = speed / Settings.BLOCK_COLLISION_CHECK_STEP_X;
            if ( speedSteps < 1 ) speedSteps = 1;
            for ( var i = 0; i < speedSteps; ++i )
            {
                this.rect.left += speed / speedSteps;
                if ( Level.current.checkLevelCollisions( this.rect ) )
                {
                    this.rect.left -= speed / speedSteps;
                    if ( i == speedSteps - 1 ) this.collision = true;
                }
                else
                {
                    this.collision = false;
                }
            }
            
            //bound level
            if ( this.rect.left > Level.current.levelBoundX - this.rect.width ) this.rect.left = Level.current.levelBoundX - this.rect.width;
        }
        
        Block.jump = function( jumpPower )
        {
            if ( this.state == Block.BLOCK_STATE_STANDING )
            {
                this.state          = Block.BLOCK_STATE_JUMPING_UP;
                this.jumpDeltaY     = jumpPower;
            }
        }
        
        Block.handleY = function()
        {
            //animate according to player state
            switch ( this.state )
            {
                case Block.BLOCK_STATE_STANDING:
                {
                    //check player falling
                    //get highest y
                    var target   = Level.current.getNearestYBelowRect( this.rect );
                    var highestY = target[ 0 ] - this.rect.height;
                    if ( this.rect.top < highestY )
                    {
                        //check distance - don't fall for small distances!
                        if ( highestY - this.rect.top < Settings.PLAYER_ASCEND_DISTANCE_Y )
                        {
                            //player just steps down
                            this.rect.top = highestY;
                            
	                        //check if player kills an enemy
	                        if ( this.type == Block.BLOCK_TYPE_PLAYER && target[ 1 ] != null && target[ 1 ].block.type == Block.BLOCK_TYPE_ENEMY )
	                        {
	                            //kill enemy        
	                            target[ 1 ].kill();
	                            
	                         	//player jumps again!
	        					this.jump( Settings.PLAYER_JUMP_POWER_Y );
	                        }                            
                            
                        }
                        else
                        {
                            //player falls
                            this.state      = Block.BLOCK_STATE_FALLING_DOWN;
                            this.jumpDeltaY = Settings.GRAVITY_FALL_DOWN;
                        }
                    }
                    else if ( this.rect.top > highestY )
                    {
                        this.rect.top = highestY;
                    }
                    break;
                }
                
                case Block.BLOCK_STATE_JUMPING_UP:
                {
                    if ( this.jumpDeltaY < 0 )
                    {
                        this.state = Block.BLOCK_STATE_FALLING_DOWN;
                    }
                    else
                    {
                        //get lowest y
                        var lowestY  = Level.current.getNearestYAboveRect( this.rect );
                        var target   = Level.current.getNearestYBelowRect( this.rect );
                        var highestY = target[ 0 ] - this.rect.height;
                        
                        this.rect.top -= this.jumpDeltaY;
                        this.jumpDeltaY -= Settings.GRAVITY_JUMP_UP;
                        
                        //check if player hit with surface
                        if ( this.rect.top < lowestY )
                        {
                            //reset player to surface
                            this.rect.top = lowestY;
                            this.jumpDeltaY = 0;
                            this.state = Block.BLOCK_STATE_FALLING_DOWN;
                        }
                        
                        //check if player falls through ramps .. avoid this
                        if ( this.rect.top > highestY )
                        {
                            this.rect.top = highestY;                            
                        }
                    }
                    break;
                }
    
                case Block.BLOCK_STATE_FALLING_DOWN:
                {
                    //get highest y
                    var target   = Level.current.getNearestYBelowRect( this.rect );
                    var highestY = target[ 0 ] - this.rect.height;
                    
                    this.rect.top   += this.jumpDeltaY;
                    this.jumpDeltaY += Settings.GRAVITY_FALL_DOWN;
    
                    //check if player hit the ground                    
                    if ( this.rect.top > highestY )
                    {
                        //reset player to ground
                        this.rect.top = highestY;
                        this.state = Block.BLOCK_STATE_STANDING;
                            
                        //check if player kills an enemy
                        if ( this.type == Block.BLOCK_TYPE_PLAYER && target[ 1 ] != null && target[ 1 ].block.type == Block.BLOCK_TYPE_ENEMY )
                        {
                            //kill enemy        
                            target[ 1 ].kill();
                            
                         	//player jumps again!
        					this.jump( Settings.PLAYER_JUMP_POWER_Y );                            
                        }
                    }
                    break;
                }
            }
        }        
        
        Block.drawDebugRect = function( camera )
        {
            //draw big debug rect over player indicating collisions
            Drawing.fillRect( this.rect.left - camera.x,     this.rect.top - camera.y,     this.rect.width,     this.rect.height,     "rgb( 255, 255, 0   )" );                   
            Drawing.fillRect( this.rect.left - camera.x + 1, this.rect.top - camera.y + 1, this.rect.width - 2, this.rect.height - 2, ( !this.collision ? "rgb( 100, 100, 100 )" : "rgb( 255, 100, 100 )" ) );
            
            //draw small state indicator                   
            switch ( this.state )
            {
                case Block.BLOCK_STATE_STANDING:
                {
                    Drawing.fillRect( this.rect.left - camera.x, this.rect.top - camera.y, 15, 15, "rgb( 0, 255, 0 )" );                
                    break;
                }
                
                case Block.BLOCK_STATE_JUMPING_UP:
                {
                    Drawing.fillRect( this.rect.left - camera.x, this.rect.top - camera.y, 15, 15, "rgb( 255, 0, 0 )" );                
                    break;
                }
    
                case Block.BLOCK_STATE_FALLING_DOWN:
                {
                    Drawing.fillRect( this.rect.left - camera.x, this.rect.top - camera.y, 15, 15, "rgb( 0, 0, 255 )" );                
                    break;
                }
            }
        }
        
        Block.animateBlock = function()
        {
            //change frame after delay
            if ( this.frameDelay > 0 )
            {
                --this.frameDelay;
            }
            else
            {
                //restart delay
                this.frameDelay = Block.BLOCK_FRAME_ANIMATION_SPEED;
                
                //next frame
                ++this.frame;
                if ( this.frame >= this.sprite.frameCount ) this.frame = 0;
                //Console.append(this.frame);
            }
            
            //swing if desired
            if ( this.swings )
            {
                //next angle                
                switch ( this.angleState )
                {
                    case Block.ANGLE_STATE_DECREASING:
                    {
                        this.angle -= Block.BLOCK_SWING_ANIMATION_SPEED;
                        if ( this.angle <= Block.BLOCK_ANGLE_MIN ) 
                        {
                            this.angle      = Block.BLOCK_ANGLE_MIN;
                            this.angleState = Block.ANGLE_STATE_INCREASING;
                        }
                        break;
                    }
                    case Block.ANGLE_STATE_INCREASING:
                    {
                        this.angle += Block.BLOCK_SWING_ANIMATION_SPEED;
                        if ( this.angle >= Block.BLOCK_ANGLE_MAX ) 
                        {
                            this.angle      = Block.BLOCK_ANGLE_MAX;
                            this.angleState = Block.ANGLE_STATE_DECREASING;
                        }
                        break;
                    }
                }
            }
        }
        
        Block.setNewSprite = function( newSprite )
        {
            //only change if sprite is a different one
            if ( this.sprite != newSprite )
            {
                this.sprite     = newSprite;
                this.frame      = 0;
                this.frameDelay = this.frameDelay = Block.BLOCK_FRAME_ANIMATION_SPEED;
            }
        }        
    }
