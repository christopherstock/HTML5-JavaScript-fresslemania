/*  $Id: Main.js 31916 2011-08-04 09:34:43Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The main class contains the application's construction and termination point.
    *
    *   TODO    HIGH    prune blue rect appearing over canvas on keeping touch pressed on iphone - try suppressing all default events!
    *   TODO    HIGH    touchables for game state(s)
    *   TODO    NORMAL  nice frames for player and enemies?
    *   TODO    WEAK    logos for supported browsers in title screen ( ie, firefox, operah, safari, konqueror, ps3, chrome, iOS )
    *   
    *	DONE			implement Block.changeSprite()
    *   DONE            sprite system
    *   DONE            improved key-system - one object per key
    *   DONE            unify Item-class with Block-class for framed and swinging blocks!
    *	DONE			separated HUD counters
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31916 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/Main.js $
    *****************************************************************************/
    var     Main                                = new Object();
    {                                           
        Main.VERSION                            = "0.1.6";
                                                
        Main.MODE_RELEASE                       = 0;
        Main.MODE_DEBUG                         = 1;
        Main.MODE                               = Main.MODE_DEBUG;
                                                
        Main.LOG_TO_SCREEN                      = true;  //( Main.MODE == Main.MODE_DEBUG );
        Main.SKIP_MAIN_MENU                     = false; //( Main.MODE == Main.MODE_DEBUG );
        Main.SKIP_LEVEL_ACCLAIM                 = false; //( Main.MODE == Main.MODE_DEBUG );
        Main.SKIP_MAIN_STATE_CHANGE_DELAY       = false; //( Main.MODE == Main.MODE_DEBUG );

        Main.THREAD_DELAY                       = 25;
        Main.MAIN_STATE_CHANGE_DELAY            = 250;
        Main.DRAW_DEBUG_BLOCKS_PLAYER           = false;
        Main.DRAW_BG                            = true;    

        Main.destroyed                          = false;

        /*****************************************************************************
        *   Being invoked when the application starts.
        *****************************************************************************/
        Main.init = function()
        {
            //acclaim
            Debug.acclaim.log( "HTML5 Test, (c) 2011 Synapsy Mobile Networks GmbH" );
            
            //init canvas
            var success = Canvas.init(); 
            if ( success )
            {
                //start main thread and main-thread interval
                window.setTimeout( "Main.tick()", Main.THREAD_DELAY );
            }
        }
    
        Main.initThreaded = function()
        {
            //attach listeners for keys and pointer
            Key.attachListeners();
            Pointer.attachListeners();
            
            //init sound engine
            Sound.init();                    
        }

        Main.initWhenImagesAreComplete = function()
        {
            //init sprites
            Sprite.init();
            
            //init player templates
            PlayerTemplate.init();
            
            //init item types
            ItemType.init();   
        }
    
        /*****************************************************************************
        *   Being invoked when the application ends.
        *****************************************************************************/
        Main.terminate = function()
        {
            Main.destroyed = true;
        }
    
        /*****************************************************************************
        *   The method for the main thread.
        *****************************************************************************/
        Main.tick = function()
        {
            //perform actions
            Action.tickActionSystem();
            
            //handle keys
            State.handleStateKeys();
            
            //ticker state
            State.tickState();
        
            //paint state
            State.drawState();
            
            //delay and start this tick again if not destroyed
            if ( !Main.destroyed ) window.setTimeout( "Main.tick()", Main.THREAD_DELAY );
        }
    }

    /*****************************************************************************
    *   This is the application's point of initialization.
    *****************************************************************************/
    window.onload   = Main.init;

    /*****************************************************************************
    *   This is the application's point of termination.
    *****************************************************************************/
    window.onunload = Main.terminate;
