/*  $Id: Level.js 31916 2011-08-04 09:34:43Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a level.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31916 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Level.js $
    *****************************************************************************/
    var     Level                           = new Object();
    {
        Level.current                       = null;
        
        Level.constructor = function()
        {
            this.coins						= 0;
            this.points                     = 0;
            
            this.walls                      = null;
            this.enemies                    = null;
            this.player                     = null;
            this.items                      = null;

            this.levelBoundX                = 10000;
            this.levelBoundY                = 2500;
            
            this.drawLevelBg                = Level.drawLevelBg;
            this.drawLevelFg                = Level.drawLevelFg;         
            this.checkLevelCollisions       = Level.checkLevelCollisions;
            this.getNearestYBelowRect       = Level.getNearestYBelowRect;
            this.getNearestYAboveRect       = Level.getNearestYAboveRect; 
            this.bringRectOnStartup         = Level.bringRectOnStartup;
            this.gainPoints                 = Level.gainPoints;          
            this.gainCoins                  = Level.gainCoins;          
        }
        
        Level.initLevel = function()
        {
            //create pristine level instance
            Level.current = new Level.constructor();
            
            //assign blocks, enemies, the player and all items
            Level.current.walls = new Array
            (
                new Wall.constructor(    0, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 1000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 1200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 1400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 1600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 1800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 2000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 2200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 2400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 2600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 2800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 3000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 3200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 3400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 3600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 3800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 4000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 4200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 4400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 4600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 4800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 5000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 5200, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 5400, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 5600, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 5800, Level.current.levelBoundY - 100,  Wall.WALL_STONE_1, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor( 6000, Level.current.levelBoundY - 100,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                
                
                new Wall.constructor(  0,   Level.current.levelBoundY - 300,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  125, Level.current.levelBoundY - 200,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                
                new Wall.constructor(  900,  Level.current.levelBoundY - 200,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  1000, Level.current.levelBoundY - 300,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),

                new Wall.constructor(  1300, Level.current.levelBoundY - 200,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          ),
                new Wall.constructor(  1500, Level.current.levelBoundY - 300,  Wall.WALL_STONE_2, Rect2D.ELEVATION_NONE          )

            );
            Level.current.enemies = new Array
            (
                new Player.constructor( 1000, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY1 ),
                new Player.constructor( 1500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY1 ),
                new Player.constructor( 2000, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY1 ),
                new Player.constructor( 2500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY1 ),
                new Player.constructor( 3500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY2 ),
                new Player.constructor( 4500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY2 ),
                new Player.constructor( 5500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY2 ),
                new Player.constructor( 6500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY2 ),
                new Player.constructor( 7500, Block.BLOCK_TYPE_ENEMY, PlayerTemplate.ENEMY2 )
             );
            
            Level.current.player  = new Player.constructor( -1, Block.BLOCK_TYPE_PLAYER, PlayerTemplate.USER );
            
            Level.current.items = new Array
            (
                new Item.constructor( 20,   Level.current.levelBoundY - 400, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 120,  Level.current.levelBoundY - 400, ItemType.ITEM_TYPE_COIN ),
                
                new Item.constructor( 800,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 900,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1000,  Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                
                new Item.constructor( 800,   Level.current.levelBoundY - 400, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 900,   Level.current.levelBoundY - 400, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1000,  Level.current.levelBoundY - 400, ItemType.ITEM_TYPE_COIN ),
                
                new Item.constructor( 1500,  Level.current.levelBoundY - 500, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1600,  Level.current.levelBoundY - 500, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1700,  Level.current.levelBoundY - 500, ItemType.ITEM_TYPE_COIN )
/*
                new Item.constructor( 50,    Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 150,   Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 250,   Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),

                new Item.constructor( 1150,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1150,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1250,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1150,   Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1250,   Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),
                new Item.constructor( 1250,   Level.current.levelBoundY - 380, ItemType.ITEM_TYPE_COIN ),
                
                new Item.constructor( 0,     Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_ORANGE ),
                new Item.constructor( 100,   Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_ORANGE ),
                new Item.constructor( 1400,  Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_CHERRY ),
                new Item.constructor( 1500,  Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_CHERRY ),
                new Item.constructor( 1600,  Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_CHERRY ),
                new Item.constructor( 1700,  Level.current.levelBoundY - 300, ItemType.ITEM_TYPE_CHERRY ),
                
                new Item.constructor( 1000,  4600, ItemType.ITEM_TYPE_APPLE  )
*/                
            );     
        }

        /*****************************************************************************
        *   Draws the bg using parallax scrolling.
        *****************************************************************************/
        Level.drawLevelBg = function( camera )
        {
            //check if bg shall be drawn
            if ( !Main.DRAW_BG )
            {
                //do NOT draw a bg                
            }
            else 
            {
                //draw bg image
                if ( Settings.scrollBgImageParallax )
                {
                    var imgWidth  = Images.getImage( Images.GAME_BG_HILL ).width; 
                    var imgHeight = Images.getImage( Images.GAME_BG_HILL ).height;
                    Drawing.drawImage
                    (
                        Images.getImage( Images.GAME_BG_HILL ), 
                        0 - ( imgWidth  - Canvas.WIDTH  ) * camera.x / ( this.levelBoundX - Canvas.WIDTH  ), 
                        0 - ( imgHeight - Canvas.HEIGHT ) * camera.y / ( this.levelBoundY - Canvas.HEIGHT ),
                        Anchor.LEFT_TOP
                    );
                }
                else
                {
                    //draw image static on center bottom of the canvas
                    Drawing.drawImage( Images.getImage( Images.GAME_BG_HILL ), Canvas.WIDTH / 2, Canvas.HEIGHT, Anchor.CENTER_BOTTOM );
                }

                //blend the image to make the fg more visible
                Drawing.fillCanvas( "rgba( 255, 255, 255, " + Settings.BG_BLENDING + " )" );
                
                //draw middle layer
                if ( Settings.scrollBgImageParallax )
                {
                    var imageDivisor = 3; 
                    
                    var imgWidth     =     Images.getImage( Images.GAME_BG_TREES ).width;
                    var imgHeight    =     Images.getImage( Images.GAME_BG_TREES ).height;
                    
                    var offsetX      =     0;
                    var offsetY      =     ( imageDivisor - 1 ) * imgHeight;
                    
                    var targetWidth  =                imgWidth;
                    var targetHeight = imageDivisor * imgHeight;
                    
                    Drawing.drawImage
                    (
                        Images.getImage( Images.GAME_BG_TREES ), 
                        0 - ( targetWidth  - Canvas.WIDTH      ) * camera.x / ( this.levelBoundX - Canvas.WIDTH  ) + offsetX, 
                        0 - ( targetHeight - Canvas.HEIGHT     ) * camera.y / ( this.levelBoundY - Canvas.HEIGHT ) + offsetY,
                        Anchor.LEFT_TOP
                    );
                }
                else    
                {
                    //draw image static on center bottom of the canvas
                    Drawing.drawImage( Images.getImage( Images.GAME_BG_TREES ), Canvas.WIDTH / 2, Canvas.HEIGHT, Anchor.CENTER_BOTTOM );
                }
            }
        }
    
        Level.drawLevelFg = function( camera )
        {
            //draw blocks in foreground
            for ( var i = 0; i < this.walls.length; ++i )
            {
                //draw block with isometric offset
                this.walls[ i ].block.drawBlock( camera );
            }    
        }
        
        Level.checkLevelCollisions = function( rect )
        {
            //check collisions on player
            if ( this.player.block.checkBlockCollision( rect ) )
            {
                return true;
            }
            
            //check collision on blocks
            for ( var i = 0; i < this.walls.length; ++i )
            {
                if ( this.walls[ i ].block.checkBlockCollision( rect ) )
                {
                    return true;
                }
            }
            
            //check collisions on enemies
            for ( var i = 0; i < this.enemies.length; ++i )
            {
                if ( !this.enemies[ i ].dead )
                {
                    if ( this.enemies[ i ].block.checkBlockCollision( rect ) )
                    {
                        return true;
                    }
                }
            }
            
            return false;    
        }    
        
        Level.getNearestYBelowRect = function( rect )
        {
            var nearestY      = this.levelBoundY;
            var nearestPlayer = null;
            var nearestBlock  = null;
            
            //consider player
            if ( this.player != null )
            {
                var blockY = this.player.block.rect.getYonCollisionXrect( rect ); 
                if ( blockY !=-1 )
                {
                    if ( blockY < nearestY && blockY >= rect.top ) 
                    {
                        nearestY      = blockY;
                        nearestPlayer = this.player;
                        nearestBlock  = this.player.block;
                    }
                }
            }
            
            //consider blocks
            if ( this.walls != null )
            {
                for ( var i = 0; i < this.walls.length; ++i )
                {
                    //check elevation below player
                    var blockY = this.walls[ i ].block.rect.getYonCollisionXrect( rect, this.walls[ i ].block.elevation ); 
                    if ( blockY != -1 )
                    {
                        if ( blockY < nearestY && blockY >= rect.top ) 
                        {
                            nearestY      = blockY;
                            nearestPlayer = null;
                            nearestBlock  = this.walls[ i ].block;
                        }
                    }
                }
            }
            
            //consider enemies
            if ( this.enemies != null )
            {
                for ( var i = 0; i < this.enemies.length; ++i )
                {
                    if ( !this.enemies[ i ].dead )
                    {
                        var blockY = this.enemies[ i ].block.rect.getYonCollisionXrect( rect ); 
                        if ( blockY !=-1 )
                        {
                            if ( blockY < nearestY && blockY >= rect.top ) 
                            {
                                nearestY      = blockY;
                                nearestPlayer = this.enemies[ i ];
                                nearestBlock  = this.enemies[ i ].block;
                            }
                        }
                    }
                }
            }
          
            var ret = new Array( 2 );
            ret[ 0 ] = nearestY;
            ret[ 1 ] = nearestPlayer;
            ret[ 2 ] = nearestBlock;
            return ret;
        }
    
        Level.getNearestYAboveRect = function( rect )
        {
            var nearestY = 0;
            
            //consider player
            if ( this.player != null )
            {
                var blockY = this.player.block.rect.getYonCollisionXrect( rect );
                if ( blockY != -1 ) 
                {
                    blockY += this.player.block.rect.height; 
                    if ( blockY > nearestY && blockY <= rect.top ) nearestY = blockY; 
                }
            }
            
            //consider blocks
            if ( this.walls != null )
            {
                for ( var i = 0; i < this.walls.length; ++i )
                {
                    //ignore elevated ramps above
                    if ( this.walls[ i ].block.elevation == Rect2D.ELEVATION_NONE )
                    {
                        var blockY = this.walls[ i ].block.rect.getYonCollisionXrect( rect );
                        if ( blockY != -1 ) 
                        {
                            blockY += this.walls[ i ].block.rect.height; 
                            if ( blockY > nearestY && blockY <= rect.top ) nearestY = blockY; 
                        }
                    }
                }
            }
            
            //consider enemies
            if ( this.enemies != null )
            {
                for ( var i = 0; i < this.enemies.length; ++i )
                {
                    if ( !this.enemies[ i ].dead )
                    {
                        //consider blocks
                        var blockY = this.enemies[ i ].block.rect.getYonCollisionXrect( rect );
                        if ( blockY != -1 ) 
                        {
                            blockY += this.enemies[ i ].block.rect.height; 
                            if ( blockY > nearestY && blockY <= rect.top ) nearestY = blockY; 
                        }
                    }
                }
            }
                          
            return nearestY;
        }
        
        Level.bringRectOnStartup = function( rect, x )
        {
            rect.left  = ( x == -1 ? ( Canvas.WIDTH - rect.width ) / 2 : x );
            var target = this.getNearestYBelowRect( rect );
            rect.top   = target[ 0 ] - rect.height;
        }
        
        Level.gainPoints = function( gain )
        {
        	if ( gain > 0 )
        	{
                this.points += gain;
                HUD.showPoints();
            }
        }
        
        Level.gainCoins = function( gain )
        {
        	if ( gain > 0 )
        	{
	            this.coins += gain;
	            HUD.showCoins();
	        }
        }
    }
