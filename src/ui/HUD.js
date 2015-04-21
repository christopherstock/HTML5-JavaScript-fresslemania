/*  $Id: HUD.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The 'heads up display'. Shows game information like points, hp etc.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/HUD.js $
    *****************************************************************************/
    var     HUD                             = new Object();
    {
        HUD.OVERLAY_ALPHA_RUNNING           = 0;
        HUD.OVERLAY_ALPHA_PAUSE             = 60;
        HUD.OVERLAY_ALPHA_SPEED             = 5;

        HUD.targetBgAlpha                  	= 0;
        HUD.currentBgAlpha                 	= 0;
        
        HUD.pointCounter                    = null;        
		HUD.coinCounter                    	= null;        

        HUD.init = function()
        {
        	//init bg
            HUD.currentBgAlpha = HUD.OVERLAY_ALPHA_PAUSE;
            
            //init counters
            HUD.pointCounter = new HUDCounter.constructor();
            HUD.coinCounter  = new HUDCounter.constructor();
             
        }            

        HUD.drawHUD = function()
        {
        	var drawY = 30;
			if ( HUD.coinCounter.draw(  "%% " + Level.current.coins  + "", drawY ) )
			{
				drawY += Images.getImage( Images.PRELOADER_NUMBERS ).height;
			}
			if ( HUD.pointCounter.draw( Level.current.points + "", drawY ) )
			{
				drawY += Images.getImage( Images.PRELOADER_NUMBERS ).height;
			}
        }
        
        HUD.showPoints = function()
        {
        	HUD.pointCounter.show();
        }
        
        HUD.showCoins = function()
        {
        	HUD.coinCounter.show();
        }
                
        HUD.animate = function()
        {
        	HUD.pointCounter.animate();
        	HUD.coinCounter.animate();
        	
        	
        }
        
        HUD.drawBgOverlay = function()
        {
            switch ( Game.gameState )
            {
                case Game.GAME_STATE_ACCLAIM:
                case Game.GAME_STATE_PAUSE:
                case Game.GAME_STATE_OVER:
                {
                    HUD.targetBgAlpha = HUD.OVERLAY_ALPHA_PAUSE;
                    break;
                }
                
                case Game.GAME_STATE_RUNNING:
                {
                    HUD.targetBgAlpha = HUD.OVERLAY_ALPHA_RUNNING;
                    break;
                }
            }
            
            HUD.aimCurrentBgAlpha();
            Drawing.fillCanvas( "rgba( 255, 255, 255, " + ( HUD.currentBgAlpha / 100 ) + " )" );
        }

        HUD.aimCurrentBgAlpha = function()
        {
            if ( HUD.currentBgAlpha < HUD.targetBgAlpha )
            {
                HUD.currentBgAlpha += HUD.OVERLAY_ALPHA_SPEED;
                if ( HUD.currentBgAlpha > HUD.targetBgAlpha ) HUD.currentBgAlpha = HUD.targetBgAlpha;
            }
            else if ( HUD.currentBgAlpha > HUD.targetBgAlpha )
            {
                HUD.currentBgAlpha -= HUD.OVERLAY_ALPHA_SPEED;
                if ( HUD.currentBgAlpha < HUD.targetBgAlpha ) HUD.currentBgAlpha = HUD.targetBgAlpha;
            }
        }            
    }
