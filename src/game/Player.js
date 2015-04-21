/*  $Id: Player.js 31929 2011-08-04 12:26:41Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents one game character.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31929 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Player.js $
    *****************************************************************************/
    var     Player                          = new Object();
    {
        Player.STANDING_LEFT                = 0;
        Player.STANDING_RIGHT               = 1;

        /*****************************************************************************
        *   Initialize and reset human player.
        *****************************************************************************/
        Player.constructor = function( x, type, template ) 
        {
            this.template           = template;

            this.speedX             = template.speedX;
            this.speedJumpX         = template.speedJumpX;
            this.jumpPowerY         = template.jumpPowerY;

            this.block              = new Block.constructor( 0, 0, template.spriteStandRight, type, Rect2D.ELEVATION_NONE, false );
            this.dead               = false;
            this.standingDirection  = Player.STANDING_RIGHT; 

            this.handlePlayerKeys   = Player.handlePlayerKeys;
            this.moveLeft           = Player.moveLeft;
            this.moveRight          = Player.moveRight;
            this.standStill         = Player.standStill;
            this.jump               = Player.jump;
            this.handleY            = Player.handleY;
            this.kill               = Player.kill;

			//set player startup position
			Level.current.bringRectOnStartup( this.block.rect, x );
        }

        /*****************************************************************************
        *   Handle the keys the user has pressed.
        *****************************************************************************/
        Player.handlePlayerKeys = function()
        {
            //alter player position
            if ( Key.KEY_LEFT.hold ) 
            {
                this.moveLeft();
            }
            if ( Key.KEY_RIGHT.hold ) 
            {
                this.moveRight();
            }
            if ( !Key.KEY_LEFT.hold && !Key.KEY_RIGHT.hold )
            {
                this.standStill();
            }
            
            //check if player shall jump - release up-key afterwards
            if ( Key.KEY_UP.hold ) 
            {
                this.jump();
                Key.KEY_UP.ignoreTillNextRelease();
            }
        }
     
        Player.handleY = function()
        {
            this.block.handleY();            
        }

        Player.standStill = function()
        {
            this.block.collision = false;
            
            //set standing sprite
            switch ( this.standingDirection )
            {
                case Player.STANDING_LEFT:
                {
                    this.block.setNewSprite( this.template.spriteStandLeft );
                    break;    
                }   
                case Player.STANDING_RIGHT:
                {
                    this.block.setNewSprite( this.template.spriteStandRight );
                    break;    
                }   
            }
        }
        
        Player.moveLeft = function()
        {
            //alter standing direction
            this.standingDirection = Player.STANDING_LEFT;
            
            //translate block left
            this.block.moveLeft( ( this.block.state == Block.BLOCK_STATE_STANDING ? this.speedX : this.speedJumpX ) );
            
            //set new sprite
            this.block.setNewSprite( this.template.spriteWalkLeft );
        }
        
        Player.moveRight = function()
        {
            //alter standing direction
            this.standingDirection = Player.STANDING_RIGHT;
            
            //translate block right
            this.block.moveRight( ( this.block.state == Block.BLOCK_STATE_STANDING ? this.speedX : this.speedJumpX ) );
            
            //set new sprite
            this.block.setNewSprite( this.template.spriteWalkRight );
        }
        
        Player.jump = function()
        {
            this.block.jump( this.jumpPowerY );
        }
        
        Player.kill = function()
        {
            this.dead = true;
            
	        //gain points
	        Level.current.gainPoints( 250 );
	        
	        //play gnash fx
	        Sound.playSound( Sound.SOUND_FX_2_GNASH );            
        }
    }
