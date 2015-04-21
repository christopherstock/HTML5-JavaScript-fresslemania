/*  $Id: Wall.js 31920 2011-08-04 09:45:56Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a wall in the level.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31920 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Wall.js $
    *****************************************************************************/
    var     Wall                            = new Object();
    {
        Wall.WALL_STONE_1                   = 0;
        Wall.WALL_STONE_2                   = 1;
        Wall.WALL_STONE_3                   = 2;
        Wall.WALL_STONE_4                   = 3;
        Wall.WALL_STONE_5                   = 4;
        Wall.WALL_STONE_6                   = 5;

        Wall.constructor = function( x, y, type, elevation )
        {
            var wallImg = 0;
            switch ( type )
            {
                case Wall.WALL_STONE_1:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_1 );    break;
                case Wall.WALL_STONE_2:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_2 );    break;        
                case Wall.WALL_STONE_3:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_3 );    break;        
                case Wall.WALL_STONE_4:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_4 );    break;        
                case Wall.WALL_STONE_5:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_5 );    break;
                case Wall.WALL_STONE_6:     wallImg = Images.getImage( Images.GAME_FLOOR_STONES_6 );    break;        
            }

            var newSprite = new Sprite.constructor( wallImg, 1, 1, 1 );
            this.block = new Block.constructor( x, y, newSprite, Block.BLOCK_TYPE_WALL, elevation, false );
        }
    }
