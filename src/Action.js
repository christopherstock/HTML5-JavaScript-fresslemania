/*  $Id: Action.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The action system performs different global actions.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/Action.js $
    *****************************************************************************/
    var     Action                              = new Object();
    {
        Action.ACTION_NONE                      = 0;
        Action.ACTION_CHANGE_TO_MAIN_MENU       = 1;
        Action.ACTION_MENU_START_GAME           = 2; 
        Action.ACTION_MENU_LOAD_GAME            = 3;
        Action.ACTION_MENU_EXTRAS               = 4;
        Action.ACTION_MENU_CREDITS              = 5;
        
        Action.actionQueue                      = new Array();
        
        Action.enqueueAction = function( action )
        {
            //append action
            Action.actionQueue.push( action );
        }

        Action.tickActionSystem = function()
        {
            //browse the queue and perform all actions
            for ( var i = 0; i < Action.actionQueue.length; ++i )
            {
                //perform action
                Action.performAction( Action.actionQueue[ i ] );                
            }   
            
            //ditch queue
            Action.actionQueue = new Array();
        }

        Action.performAction = function( action )
        {        
            switch ( action )
            {
                case Action.ACTION_NONE:
                {
                    //do nothing
                    break;                    
                }
                
                case Action.ACTION_CHANGE_TO_MAIN_MENU:
                {
                    //stop sound
                    Sound.stopSound( Sound.SOUND_BG_1 );
                    
                    //reset main menu
                    Menu.resetMainMenu();
                    
                    //change main state 
                    State.changeMainState( State.MAIN_STATE_MENU );

                    break;
                }        

                case Action.ACTION_MENU_START_GAME:
                {
                    //init new game
                    Game.initNewGame();
                    
                    //change main state
                    State.changeMainState( State.MAIN_STATE_GAME );
   
                    break;    
                }      
                
                case Action.ACTION_MENU_LOAD_GAME:
                {
                    //change main state
                    State.changeMainState( State.MAIN_STATE_LOAD_GAME );
                    
                    break;   
                }
                
                case Action.ACTION_MENU_EXTRAS:
                {
                    //change main state
                    State.changeMainState( State.MAIN_STATE_EXTRAS );
                    
                    break;    
                }
                     
                case Action.ACTION_MENU_CREDITS:
                {
                    //change main state
                    State.changeMainState( State.MAIN_STATE_CREDITS );
                    break;   
                }
            }
        }        
    }
