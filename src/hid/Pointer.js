/*  $Id: Pointer.js 31865 2011-08-03 14:24:02Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Processes pointer operations.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31865 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/hid/Pointer.js $
    *****************************************************************************/
    var     Pointer                         = new Object();
    {
        Pointer.SOURCE_TOUCH                = 0;
        Pointer.SOURCE_MOUSE                = 1;
        
        Pointer.pointerSource               = 0;
        Pointer.mouseDown                   = false;
        
        Pointer.attachListeners = function()
        {
            //get the pointer source - mouse or touch
            if ( Pointer.isTouchDevice() )
            {
                Debug.hid.log( "Initializing pointer-system for TOUCH devices" );
                //alert("initialized as TOUCH device");
                Pointer.pointerSource = Pointer.SOURCE_TOUCH;   
            }
            else
            {
                Debug.hid.log( "Initializing pointer-system for MOUSE devices" );
                Pointer.pointerSource = Pointer.SOURCE_MOUSE;   
                //alert("initialized as MOUSE device");
            }

            //suppress all touch events for the document
            document.addEventListener(      "touchstart",       Pointer.suppressEvent,          false   );
            document.addEventListener(      "touchmove",        Pointer.suppressEvent,          false   );
            document.addEventListener(      "touchend",         Pointer.suppressEvent,          false   );
            document.addEventListener(      "gesturestart",     Pointer.suppressEvent,          false   );
            document.addEventListener(      "gesturechange",    Pointer.suppressEvent,          false   );
            document.addEventListener(      "gestureend",       Pointer.suppressEvent,          false   );

            //suppress all mouse events for the document
            document.addEventListener(      "contextmenu",      Pointer.suppressEvent,          false   );
            document.addEventListener(      "mousedown",        Pointer.suppressEvent,          false   );
            document.addEventListener(      "mouseup",          Pointer.suppressEvent,          false   );
            document.addEventListener(      "mousemove",        Pointer.suppressEvent,          false   );
            document.addEventListener(      "oncontextmenu",    Pointer.suppressEvent,          false   );
            document.addEventListener(      "onmousedown",      Pointer.suppressEvent,          false   );
            document.addEventListener(      "onmouseup",        Pointer.suppressEvent,          false   );
            document.addEventListener(      "onmousemove",      Pointer.suppressEvent,          false   );

            //assign listeners according to pointer source 
            switch ( Pointer.pointerSource )
            {
                case Pointer.SOURCE_TOUCH:
                {
                    //set touch events for the canvas                    
                    Canvas.OBJECT.addEventListener( "touchstart",       Pointer.handleTouchStart,       false   );           
                    Canvas.OBJECT.addEventListener( "touchmove",        Pointer.handleTouchMove,        false   );
                    Canvas.OBJECT.addEventListener( "touchend",         Pointer.handleTouchEnd,         false   );
                    break;   
                }
                
                case Pointer.SOURCE_MOUSE:
                {
                    //set mouse events for the canvas
                    Canvas.OBJECT.addEventListener( "mousedown",        Pointer.handleMouseDown,        false   );           
                    Canvas.OBJECT.addEventListener( "mousemove",        Pointer.handleMouseMove,        false   );
                    Canvas.OBJECT.addEventListener( "mouseup",          Pointer.handleMouseUp,          false   );
                    break;   
                }
            }
        }

        Pointer.suppressEvent = function( evt ) 
        {
            //Debug.hid.log( "default event suppressed" );
            evt.preventDefault(); 
        }

        Pointer.handleMouseDown = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();    
            
            var pointerX = evt.pageX - Canvas.OBJECT.offsetLeft;
            var pointerY = evt.pageY - Canvas.OBJECT.offsetTop;
            
            Debug.hid.log( "mouse down [" + pointerX + "," + pointerY + "]" );
            
            //flag mouse as pushed
            Pointer.mouseDown = true;
            
            //delegate to state system
            State.delegatePointerDown( pointerX, pointerY );
        }
        
        Pointer.handleMouseUp = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();
                
            var pointerX = evt.pageX - Canvas.OBJECT.offsetLeft;
            var pointerY = evt.pageY - Canvas.OBJECT.offsetTop;
            
            Debug.hid.log( "mouse up [" + pointerX + "," + pointerY + "]" );
            
            //flag mouse as released
            Pointer.mouseDown = false;
            
            //delegate to state system
            State.delegatePointerUp( pointerX, pointerY );
        }
        
        Pointer.handleMouseMove = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();    
            
            //only delegate if mouse is pushed
          //if ( Pointer.mouseDown )
            {
                var pointerX = evt.pageX - Canvas.OBJECT.offsetLeft;
                var pointerY = evt.pageY - Canvas.OBJECT.offsetTop;
                
                Debug.hid.log( "mouse move [" + pointerX + "," + pointerY + "]" );
                
                //delegate to state system
                State.delegatePointerMove( pointerX, pointerY );
            }
        }        
        
        Pointer.handleTouchStart = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();    
            
            var touchX = evt.targetTouches[ 0 ].pageX - Canvas.OBJECT.offsetLeft;
            var touchY = evt.targetTouches[ 0 ].pageY - Canvas.OBJECT.offsetTop;
                       
            //alert( "touch start [" + touchX + "," + touchY + "]" );                        
            //Debug.hid.log( "touch start [" + touchX + "," + touchY + "]" );
            
            //alert( "checkpoint 0" );
            
            //delegate to state system
            State.delegatePointerDown( touchX, touchY );
        }

        Pointer.handleTouchMove = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();    
            
            var touchX = evt.targetTouches[ 0 ].pageX - Canvas.OBJECT.offsetLeft;
            var touchY = evt.targetTouches[ 0 ].pageY - Canvas.OBJECT.offsetTop;
                        
            //alert( "touch move[" + touchX + "," + touchY + "]" );                        
            //Debug.hid.log( "touch move [" + touchX + "," + touchY + "]" );
            
            //delegate to state system
            State.delegatePointerMove( touchX, touchY );
        }

        Pointer.handleTouchEnd = function( evt )
        {
            //always suppress the default event
            evt.preventDefault();    
            
            var touchX = evt.changedTouches[ 0 ].pageX - Canvas.OBJECT.offsetLeft;
            var touchY = evt.changedTouches[ 0 ].pageY - Canvas.OBJECT.offsetTop;
                        
            //alert( "touch end[" + touchX + "," + touchY + "]" );                        
            //Debug.hid.log( "touch end [" + touchX + "," + touchY + "]" );
            
            //delegate to state system
            State.delegatePointerUp( touchX, touchY );
        }

        Pointer.isTouchDevice = function()
        {
            try 
            {
                //check if a touch event can be created        
                document.createEvent( "TouchEvent" );
                
                return true;    
            } 
            catch ( e ) 
            {
                return false;
            }   
        }        
    }
