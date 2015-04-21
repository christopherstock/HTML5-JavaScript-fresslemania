/*  $Id: HUDCounter.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   This represents one counter being displayed in the HUD.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/HUDCounter.js $
    *****************************************************************************/
    var     HUDCounter                          = new Object();
    {
        HUDCounter.STATE_APPEARING              = 0;
        HUDCounter.STATE_STILL                  = 1;
        HUDCounter.STATE_DISAPPEARING           = 2;        
        
        HUDCounter.constructor = function()
        {
            this.icon       = null;
            this.ticker     = 0;
            this.state      = HUDCounter.STATE_DISAPPEARING;
            
            this.draw		= HUDCounter.draw;
            this.show		= HUDCounter.show;
            this.animate	= HUDCounter.animate;
        }
        
        HUDCounter.draw = function( msg, drawY )
        {
            var pointstringWidth = msg.length * Images.getImage( Images.PRELOADER_NUMBERS ).width / 11;

            //draw points display            
            switch ( this.state )
            {
                case HUDCounter.STATE_APPEARING:
                {
                    Drawing.drawBitmapString( msg + "", Canvas.WIDTH - 30 + ( pointstringWidth * this.ticker / Settings.HUD_COUNTER_TICKER_TIME_SHOW_HIDE ), drawY, Anchor.RIGHT_TOP );
                    return true;
                }                    
                case HUDCounter.STATE_STILL:
                {
                    Drawing.drawBitmapString( msg + "", Canvas.WIDTH - 30, drawY, Anchor.RIGHT_TOP );
                    return true;
                }                    
                case HUDCounter.STATE_DISAPPEARING:
                {
                    if ( this.ticker > 0 )
                    {
                        Drawing.drawBitmapString( msg + "", Canvas.WIDTH - 30 + pointstringWidth - ( pointstringWidth * this.ticker / Settings.HUD_COUNTER_TICKER_TIME_SHOW_HIDE ), drawY, Anchor.RIGHT_TOP );
                    	return true;
                    }
                    break;
                }                    
            }                
        
        	return false;
        }
        
        HUDCounter.show = function()
        {
            switch ( this.state )
            {
                case HUDCounter.STATE_APPEARING:
                {
                    //no changes
                    break;
                }                    
                case HUDCounter.STATE_STILL:
                {
                    //reset point duration
                    this.ticker      = Settings.HUD_COUNTER_TICKER_TIME_STILL;
                    break;
                }                    
                case HUDCounter.STATE_DISAPPEARING:
                {
                    this.state       = HUDCounter.STATE_APPEARING;
                    this.ticker      = Settings.HUD_COUNTER_TICKER_TIME_SHOW_HIDE;
                    break;
                }                    
            }
        }
        
        HUDCounter.animate = function()
        {
            if ( this.ticker > 0 ) 
            {
                --this.ticker;
            }
            else
            {
                switch ( this.state )
                {
                    case HUDCounter.STATE_APPEARING:
                    {
                        this.ticker = Settings.HUD_COUNTER_TICKER_TIME_STILL;
                        this.state        = HUDCounter.STATE_STILL;
                        break;
                    }                    
                    case HUDCounter.STATE_STILL:
                    {
                        this.ticker = Settings.HUD_COUNTER_TICKER_TIME_SHOW_HIDE;
                        this.state        = HUDCounter.STATE_DISAPPEARING;
                        break;
                    }                    
                    case HUDCounter.STATE_DISAPPEARING:
                    {
                        //do nothing
                        break;
                    }                    
                }                
            }
        }
    }
