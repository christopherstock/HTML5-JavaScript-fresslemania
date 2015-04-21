/*  $Id: Player.js 31862 2011-08-03 13:39:20Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   A template for an game character.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31862 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Player.js $
    *****************************************************************************/
    var     PlayerTemplate                  = new Object();
    {
        PlayerTemplate.USER                 = null;
        PlayerTemplate.ENEMY1               = null;
        PlayerTemplate.ENEMY2               = null;
        
        PlayerTemplate.constructor = function( speedX, speedJumpX, jumpPowerY, spriteWalkLeft, spriteWalkRight, spriteStandLeft, spriteStandRight )
        {
            this.speedX             = speedX;
            this.speedJumpX         = speedJumpX;
            this.jumpPowerY         = jumpPowerY;
            this.spriteWalkLeft     = spriteWalkLeft;
            this.spriteWalkRight    = spriteWalkRight;
            this.spriteStandLeft    = spriteStandLeft;
            this.spriteStandRight   = spriteStandRight;
        }

        PlayerTemplate.init = function()
        {
            PlayerTemplate.USER   = new PlayerTemplate.constructor( Settings.PLAYER_SPEED_WALKING_X, Settings.PLAYER_SPEED_JUMPING_X, Settings.PLAYER_JUMP_POWER_Y, Sprite.PLAYER1_WALK_LEFT, Sprite.PLAYER1_WALK_RIGHT, Sprite.PLAYER1_STAND_LEFT, Sprite.PLAYER1_STAND_RIGHT );
            PlayerTemplate.ENEMY1 = new PlayerTemplate.constructor( 1, 1, 10.0, Sprite.ENEMY1, Sprite.ENEMY1, Sprite.ENEMY1, Sprite.ENEMY1 );
            PlayerTemplate.ENEMY2 = new PlayerTemplate.constructor( 5, 5, 10.0, Sprite.ENEMY1, Sprite.ENEMY1, Sprite.ENEMY1, Sprite.ENEMY1 );
            
            
        }
    }
