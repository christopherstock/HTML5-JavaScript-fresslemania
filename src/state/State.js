/*  $Id: State.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The main state system.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/state/State.js $
    *****************************************************************************/
    var     State                           = new Object();
    {
        State.MAIN_STATE_PRELOADER          = 0;
        State.MAIN_STATE_MENU               = 1;
        State.MAIN_STATE_GAME               = 2;
        State.MAIN_STATE_LOAD_GAME          = 3;
        State.MAIN_STATE_EXTRAS             = 4;
        State.MAIN_STATE_CREDITS            = 5;

        State.mainState                     = State.MAIN_STATE_PRELOADER;
        State.mainStateToChangeTo           = -1;
        State.mainStateChangeTimestamp      = 0;
    
        State.tickState = function()
        {
            //change main state if ordered
            State.checkChange();
            
            switch ( State.mainState )
            {
                case State.MAIN_STATE_PRELOADER:
                {
                    Preloader.tickPreloader();
                    break;
                }
                
                case State.MAIN_STATE_MENU:
                {
                    Menu.tickMenu();
                    break;
                }
            
                case State.MAIN_STATE_GAME:
                {
                    Game.tickGame();            
                    break;
                }
                
                case State.MAIN_STATE_LOAD_GAME:
                case State.MAIN_STATE_EXTRAS: 
                case State.MAIN_STATE_CREDITS:
                {
                    //immediately switch back to main menu!
                    State.mainState = State.MAIN_STATE_MENU;
                    break;                    
                }
            }
        }

        State.drawState = function() 
        {
            //draw main state
            switch ( State.mainState )
            {
                case State.MAIN_STATE_PRELOADER:
                {
                    Preloader.drawPreloader();
                    break;
                }        
                    
                case State.MAIN_STATE_MENU:
                case State.MAIN_STATE_LOAD_GAME:
                case State.MAIN_STATE_EXTRAS: 
                case State.MAIN_STATE_CREDITS:
                {
                    Menu.drawMenu();
                    Menu.drawMenuTouchables();
                    break;
                }

                case State.MAIN_STATE_GAME:
                {
                    Game.drawGame();
                    break;
                }
            }

            //draw debug console
            Console.draw()
        }
        
        State.handleStateKeys = function()
        {
            //only handle keys if the main state is not being changed
            if ( !State.changeInProgress() )
            {
                switch ( State.mainState )
                {
                    case State.MAIN_STATE_PRELOADER:
                    {
                        //no keys possible for the preloader state
                        break;
                    }        
                        
                    case State.MAIN_STATE_MENU:
                    {
                        //handle menu keys
                        Menu.handleKeys();
                        break;
                    }
                    
                    case State.MAIN_STATE_GAME:
                    {
                        //handle game keys
                        Game.handleKeys();
                        break;
                    }
                    
                    case State.MAIN_STATE_LOAD_GAME:
                    case State.MAIN_STATE_EXTRAS: 
                    case State.MAIN_STATE_CREDITS:
                    {
                        break;                        
                    }
                }
            }
        }
        
        State.delegatePointerDown = function( pointerX, pointerY )
        {
            //alert( "checkpoint 1" );
            
            //only delegate if the main state is not being changed
            if ( !State.changeInProgress() )
            {
                //alert( "checkpoint 2" );
                
                switch ( State.mainState )
                {
                    case State.MAIN_STATE_PRELOADER:
                    {
                        //pointer events are not delegated to the preloader
                        break;
                    }        
                        
                    case State.MAIN_STATE_MENU:
                    {
                        //alert( "checkpoint 3" );
                        
                        //delegate pointer event to main menu
                        Menu.delegatePointerDown( pointerX, pointerY );
                        break;
                    }
                    
                    case State.MAIN_STATE_GAME:
                    {
                        //delegate pointer event to game
                        
                        break;
                    }
                    
                    case State.MAIN_STATE_LOAD_GAME:
                    case State.MAIN_STATE_EXTRAS: 
                    case State.MAIN_STATE_CREDITS:
                    {
                        break;   
                    }
                }
            }
        }

        State.delegatePointerUp = function( pointerX, pointerY )
        {
            //only delegate if the main state is not being changed
            if ( !State.changeInProgress() )
            {
                switch ( State.mainState )
                {
                    case State.MAIN_STATE_PRELOADER:
                    {
                        //pointer events are not delegated to the preloader
                        break;
                    }        
                        
                    case State.MAIN_STATE_MENU:
                    {
                        //delegate pointer event to main menu
                        Menu.delegatePointerUp( pointerX, pointerY );
                        break;
                    }
    
                    case State.MAIN_STATE_GAME:
                    {
                        //delegate pointer event to game
                        
                        break;
                    }
                    
                    case State.MAIN_STATE_LOAD_GAME:
                    case State.MAIN_STATE_EXTRAS: 
                    case State.MAIN_STATE_CREDITS:
                    {
                        break;                    
                    }
                }
            }
        }
        
        State.delegatePointerMove = function( pointerX, pointerY )
        {
            //only delegate if the main state is not being changed
            if ( !State.changeInProgress() )
            {
                switch ( State.mainState )
                {
                    case State.MAIN_STATE_PRELOADER:
                    {
                        //pointer events are not delegated to the preloader
                        break;
                    }        
                        
                    case State.MAIN_STATE_MENU:
                    {
                        //delegate pointer event to main menu
                        Menu.delegatePointerMove( pointerX, pointerY );
                        break;
                    }
    
                    case State.MAIN_STATE_GAME:
                    {
                        //delegate pointer event to game
                        
                        break;
                    }
                    
                    case State.MAIN_STATE_LOAD_GAME:
                    case State.MAIN_STATE_EXTRAS: 
                    case State.MAIN_STATE_CREDITS:
                    {
                        break;   
                    }
                }
            }
        }
        
        State.changeMainState = function( newMainState )
        {
            State.mainStateChangeTimestamp = new Date().getTime();
            State.mainStateToChangeTo      = newMainState;
        }
        
        State.checkChange = function()
        {
            //check if main state shall be changed
            if ( State.mainStateToChangeTo != -1 )
            {
                //change main state after delay
                if ( State.mainStateChangeTimestamp < new Date().getTime() - Main.MAIN_STATE_CHANGE_DELAY || Main.SKIP_MAIN_STATE_CHANGE_DELAY )
                {
                    State.mainState             = State.mainStateToChangeTo;
                    State.mainStateToChangeTo   = -1;
                }                
            }
        }
        
        State.changeInProgress = function()
        {
            var ret = ( State.mainStateToChangeTo != -1 );   
            return ret;
        }
    }
