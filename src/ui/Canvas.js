/*  $Id: Canvas.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents the 2d drawing surface.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Canvas.js $
    *****************************************************************************/
    var     Canvas                          = new Object();
    {
        Canvas.MAX_DESKTOP_CANVAS_WIDTH     = 1000;
        Canvas.MIN_DESKTOP_CANVAS_WIDTH     = 800;
        Canvas.MAX_MOBILE_CANVAS_WIDTH      = 500;

        Canvas.TYPE_DESKTOP                 = 0;
        Canvas.TYPE_MOBILE                  = 1;
        
        Canvas.PROPORTION                   = 1.66666666667;
        Canvas.SCALE_FACTOR                 = 0;
         
        Canvas.OBJECT                       = 0;
        Canvas.CONTEXT                      = 0;
        Canvas.WIDTH                        = 0;
        Canvas.HEIGHT                       = 0;
        Canvas.TYPE                         = 0;
    
        /*****************************************************************************
        *   Inits the canvas.
        *
        *   @return     <code>true</code> if the canvas has been detected and 
        *               initialized successfully. Otherwise <code>false</code>.
        *****************************************************************************/
        Canvas.init = function()
        {
            Canvas.OBJECT = document.getElementById( 'canvas' );
            if ( Canvas.OBJECT.getContext )
            {
                //read body dimensions
                var bodyWidth  = screen.availWidth;
                var bodyHeight = screen.availHeight;

                //try another value if not available
                if ( bodyWidth  == 0 ) bodyWidth  = window.innerWidth;
                if ( bodyHeight == 0 ) bodyHeight = window.innerHeight;

                //calculate new canvas dimensions - clip max width
                var newCanvasWidth  = bodyWidth * 3 / 4;
                if ( newCanvasWidth >= Canvas.MIN_DESKTOP_CANVAS_WIDTH )
                {
                    Canvas.TYPE = Canvas.TYPE_DESKTOP;
                    if ( newCanvasWidth > Canvas.MAX_DESKTOP_CANVAS_WIDTH ) newCanvasWidth = Canvas.MAX_DESKTOP_CANVAS_WIDTH; 
                }
                else
                {
                    Canvas.TYPE = Canvas.TYPE_MOBILE;
                    if ( newCanvasWidth > Canvas.MAX_MOBILE_CANVAS_WIDTH ) newCanvasWidth = Canvas.MAX_MOBILE_CANVAS_WIDTH;
                    
                    //disable thread delay for mobiles ! ( experimental )
                    Main.THREAD_DELAY = 0;
                }
                var newCanvasHeight = newCanvasWidth / Canvas.PROPORTION; 

                //assign dimensions
                Canvas.OBJECT.width  = newCanvasWidth;
                Canvas.OBJECT.height = newCanvasHeight;
                
                //show new dimensions
                //alert( Canvas.OBJECT.width + " ; " + Canvas.OBJECT.height );
                
                //assign scale factor
                Canvas.SCALE_FACTOR = Canvas.OBJECT.width / Canvas.MAX_DESKTOP_CANVAS_WIDTH; 
                //alert( Canvas.SCALE_FACTOR );
                
                //init essentials
                Canvas.CONTEXT  = Canvas.OBJECT.getContext( '2d' )
                Canvas.WIDTH    = Canvas.OBJECT.width;
                Canvas.HEIGHT   = Canvas.OBJECT.height;
                
                return true;
            }
            
            return false;
        }
    }
