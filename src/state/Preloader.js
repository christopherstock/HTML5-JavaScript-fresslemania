/*  $Id: Preloader.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Preloader stuff.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/state/Preloader.js $
    *****************************************************************************/
    var     Preloader                                       = new Object();
    {
        Preloader.PRELOADER_STATE_STARTUP                   = 0;
        Preloader.PRELOADER_STATE_LOADING_PRELOADER_IMAGES  = 1;
        Preloader.PRELOADER_STATE_LOADING_REST_IMAGES       = 2;
        Preloader.PRELOADER_STATE_COMPLETED                 = 3;
        
        Preloader.preloaderState                            = 0;

        Preloader.tickPreloader = function()
        {
            //load all images in 1st tick
            switch ( Preloader.preloaderState )
            {
                case Preloader.PRELOADER_STATE_STARTUP:
                {
                    //perform threaded inits
                    Main.initThreaded();
                    
                    //order preloader pics
                    Images.orderPreloaderImages();
                    
                    //next preloader state 
                    ++Preloader.preloaderState;
                    
                    break;
                }

                case Preloader.PRELOADER_STATE_LOADING_PRELOADER_IMAGES:
                {
                    //continue not until the preloader pics have been loaded
                    if ( Images.loadedCount >= Images.PRELOADER_INDICES )
                    {
                        //order all other images
                        Images.orderRest();

                        //next preloader tick
                        ++Preloader.preloaderState
                    }             
                    break;
                }
                
                case Preloader.PRELOADER_STATE_LOADING_REST_IMAGES:
                {
                    //continue not until all images have been loaded
                    if ( Images.loadedCount == Images.FILE_NAMES.length )
                    {     
                        //setup when all images are completed
                        Main.initWhenImagesAreComplete();
                        
                        //change to main menu
                        Action.enqueueAction( Action.ACTION_CHANGE_TO_MAIN_MENU );
                        
                        //next preloader tick
                        ++Preloader.preloaderState;
                    }            
                    break;
                }
                
                case Preloader.PRELOADER_STATE_COMPLETED:
                {
                    //do nothing - wait till main state change after delay
                    break;
                }
            }
        }

        Preloader.drawPreloader = function() 
        {
            //clear screen
            Drawing.fillCanvas( "rgb( 0, 0, 0 )" );
         
            //draw only if images are available
            if ( Images.loadedCount >= Images.PRELOADER_INDICES )
            {
                //Drawing.drawTextOutlined( "( " + percent + " % )", Canvas.WIDTH / 2, Canvas.HEIGHT * 3 / 4, "#000000", "#ffffff", "20px Verdana", Anchor.CENTER_MIDDLE );
    
                //draw number as sprite
                var percent = Math.round( ( Images.loadedCount / Images.FILE_NAMES.length ) * 100 ); 
                Drawing.drawBitmapString( percent + " %", Canvas.WIDTH / 2, Canvas.HEIGHT / 2, Anchor.CENTER_MIDDLE );
            }
        }
    }
