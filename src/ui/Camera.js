/*  $Id: Camera.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Builds the gamestate.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Camera.js $
    *****************************************************************************/
    var     Camera                          = new Object();
    {
        Camera.RATIO_CENTERING_X            = 2;
        Camera.RATIO_CENTERING_Y            = 2;
        
        Camera.constructor = function()
        {
            this.x = 0;
            this.y = 0;
        }
        
        Camera.current                      = new Camera.constructor();
        
        Camera.getCurrent = function()
        {
            //calculate scroll-x-offset so camera is centered to player - clip camera to level bounds
            Camera.current.x = Level.current.player.block.rect.left - Canvas.WIDTH / Camera.RATIO_CENTERING_X + Level.current.player.block.rect.width / 2;
            if ( Camera.current.x < 0                                           ) Camera.current.x = 0;
            if ( Camera.current.x > Level.current.levelBoundX - Canvas.WIDTH    ) Camera.current.x = Level.current.levelBoundX - Canvas.WIDTH;
            Camera.current.y = Level.current.player.block.rect.top - Canvas.HEIGHT / Camera.RATIO_CENTERING_Y + Level.current.player.block.rect.height / 2;
            if ( Camera.current.y < 0                                           ) Camera.current.y = 0;
            if ( Camera.current.y > Level.current.levelBoundY - Canvas.HEIGHT   ) Camera.current.y = Level.current.levelBoundY - Canvas.HEIGHT;
            
            return Camera.current;
        }
    }
