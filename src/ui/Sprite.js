/*  $Id: Images.js 31866 2011-08-03 14:59:39Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   A sprite is one image that forms several bitmaps from the bitmap data.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31866 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Images.js $
    *****************************************************************************/
    var     Sprite                          = new Object();
    {
        Sprite.PLAYER1_WALK_LEFT            = null;
        Sprite.PLAYER1_WALK_RIGHT           = null;
        Sprite.PLAYER1_STAND_LEFT           = null;
        Sprite.PLAYER1_STAND_RIGHT          = null;
        Sprite.ENEMY1                       = null;
        Sprite.COIN                         = null;
        Sprite.APPLE                        = null;

        Sprite.constructor = function( img, framesX, framesY, frameCount )
        {
            this.img         = img;
            this.framesX     = framesX;
            this.framesY     = framesY;
            this.frameCount  = frameCount;    
            this.frameWidth  = img.width  / framesX;
            this.frameHeight = img.height / framesY;
        }

        Sprite.init = function()
        {
            Sprite.PLAYER1_WALK_LEFT    = new Sprite.constructor( Images.getImage( Images.GAME_PLAYER_WALK_LEFT   ), 9, 1, 9  );
            Sprite.PLAYER1_WALK_RIGHT   = new Sprite.constructor( Images.getImage( Images.GAME_PLAYER_WALK_RIGHT  ), 9, 1, 9  );
            Sprite.PLAYER1_STAND_LEFT   = new Sprite.constructor( Images.getImage( Images.GAME_PLAYER_STAND_LEFT  ), 1, 1, 1  );
            Sprite.PLAYER1_STAND_RIGHT  = new Sprite.constructor( Images.getImage( Images.GAME_PLAYER_STAND_RIGHT ), 1, 1, 1  );
            Sprite.ENEMY1               = new Sprite.constructor( Images.getImage( Images.GAME_ENEMY_1            ), 6, 1, 6  );
            Sprite.COIN                 = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_COIN          ), 5, 4, 20 );
            Sprite.APPLE                = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_APPLE         ), 3, 4, 10 );
            Sprite.CHERRY               = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_CHERRY        ), 1, 1, 1  );
            Sprite.ORANGE               = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_ORANGE        ), 1, 1, 1  );
            Sprite.PEAR                 = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_PEAR          ), 1, 1, 1  );
            Sprite.STRAWBERRY           = new Sprite.constructor( Images.getImage( Images.GAME_ITEM_STRAWBERRY    ), 1, 1, 1  );
        }
    }
