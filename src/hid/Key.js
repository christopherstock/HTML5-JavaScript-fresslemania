/*  $Id: Key.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents one pressed key.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/hid/Key.js $
    *****************************************************************************/
    var     Key                             = new Object();
    {
        Key.KEYCODE_ENTER                   = 13;
        Key.KEYCODE_ESCAPE                  = 27;
        Key.KEYCODE_SPACE                   = 32;
        Key.KEYCODE_LEFT                    = 37;
        Key.KEYCODE_UP                      = 38;
        Key.KEYCODE_RIGHT                   = 39;
        Key.KEYCODE_DOWN                    = 40;
        Key.KEYCODE_B                       = 66;
        
        Key.constructor = function( keyCode )
        {
            this.keyCode                = keyCode;
            this.hold                   = false;
            this.needsRelease           = false;
               
            this.ignoreTillNextRelease  = Key.ignoreTillNextRelease;         
        }

        Key.ignoreTillNextRelease = function()
        {
            //release the key
            this.hold = false;
            
            //only allow repress after release
            this.needsRelease = true;   
        }

        Key.KEY_ENTER                       = new Key.constructor( Key.KEYCODE_ENTER  );
        Key.KEY_ESCAPE                      = new Key.constructor( Key.KEYCODE_ESCAPE );
        Key.KEY_SPACE                       = new Key.constructor( Key.KEYCODE_SPACE  );
        Key.KEY_LEFT                        = new Key.constructor( Key.KEYCODE_LEFT   );
        Key.KEY_UP                          = new Key.constructor( Key.KEYCODE_UP     );
        Key.KEY_RIGHT                       = new Key.constructor( Key.KEYCODE_RIGHT  );
        Key.KEY_DOWN                        = new Key.constructor( Key.KEYCODE_DOWN   );
        Key.KEY_B                           = new Key.constructor( Key.KEYCODE_B      );
        
        Key.KEYS = new Array
        (
            Key.KEY_ENTER,
            Key.KEY_ESCAPE,
            Key.KEY_SPACE,
            Key.KEY_LEFT,
            Key.KEY_UP,
            Key.KEY_RIGHT,
            Key.KEY_DOWN,
            Key.KEY_B
        );
        
        Key.attachListeners = function()
        {
            //set event listener for keyboard devices - all but IE
            window.addEventListener( "keydown",     Key.handleKeyDown, false );           
            window.addEventListener( "keyup",       Key.handleKeyUp,   false );
                       
            //set event listener for keyboard devices - IE
            window.addEventListener( "onkeydown",   Key.handleKeyDown, false );           
            window.addEventListener( "onkeyup",     Key.handleKeyUp,   false );           
        }    
    
        Key.handleKeyDown = function( evt )
        {
            var keyCode = evt.which;
            Debug.hid.log( "key down ["  + keyCode + "]" );
            
            //browse all supported keys
            for ( var i = 0; i < Key.KEYS.length; ++i )
            {
                //check if keycode matches to this key
                if ( keyCode == Key.KEYS[ i ].keyCode )
                {
                    //check if key needs release
                    if ( !Key.KEYS[ i ].needsRelease )
                    {
                        //flag this key as pressed
                        Key.KEYS[ i ].hold = true;        
                    }
                }                
            }
        }
    
        Key.handleKeyUp = function( evt )
        {
            var keyCode = evt.which;
            Debug.hid.log( "key up ["  + keyCode + "]" );
            
            //browse all supported keys
            for ( var i = 0; i < Key.KEYS.length; ++i )
            {
                //check if keycode matches to this key
                if ( keyCode == Key.KEYS[ i ].keyCode )
                {
                    //flag this key as released
                    Key.KEYS[ i ].hold          = false;        
                    Key.KEYS[ i ].needsRelease  = false;
                }                
            }
        }
    }
