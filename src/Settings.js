/*  $Id: Settings.js 31929 2011-08-04 12:26:41Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Contains all adjustments and balancings for the application.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31929 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/Settings.js $
    *****************************************************************************/
    var     Settings                                = new Object();
    {
        Settings.MUTE                               = false;
        
        //gravity
        Settings.GRAVITY_JUMP_UP                    = 1.1;
        Settings.GRAVITY_FALL_DOWN                  = 2.0;
        
        /** Speed in pixel per frame. */
        Settings.PLAYER_SPEED_WALKING_X             = 10;
        Settings.PLAYER_SPEED_JUMPING_X             = 10;
        Settings.PLAYER_ASCEND_DISTANCE_Y           = 20;
        /** Player's jump power in y-pixels per tick. */
        Settings.PLAYER_JUMP_POWER_Y                = 20.0;        
        
        Settings.BLOCK_COLLISION_CHECK_STEP_X       = 1;    
        
        Settings.HUD_COUNTER_TICKER_TIME_SHOW_HIDE  = 10;
        Settings.HUD_COUNTER_TICKER_TIME_STILL      = 50;
        
        Settings.BG_BLENDING                        = 0.5;
        
        Settings.scrollBgImageParallax              = true;
    }
