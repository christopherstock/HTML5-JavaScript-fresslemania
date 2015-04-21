/*  $Id: Button.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   A touchable button for the pointer system.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/touch/Button.js $
    *****************************************************************************/
    var     Button                          = new Object();
    {
        Button.BUTTON_STATE_UNSELECTED      = 0;
        Button.BUTTON_STATE_HOVER_IN        = 1;
        Button.BUTTON_STATE_HOVER_OUT       = 2;
        Button.BUTTON_STATE_SELECTED        = 3;
        
        /*****************************************************************************
        *   Constructs a button with the exact dimensions of the specified image.
        *
        *   @param  x               Button's location x.
        *   @param  y               Button's location y.
        *   @param  imgUnselected   The button's unselected image.
        *   @param  imgHover        The button's hovered    image.
        *   @param  imgSelected     The button's selected   image.
        *****************************************************************************/
        Button.constructor = function( x, y, imgUnselected, imgHover, imgSelected )
        {
            this.imgUnselected          = imgUnselected;
            this.imgHover               = imgHover;
            this.imgSelected            = imgSelected;

            this.rect                   = new Rect2D.constructor( x, y, imgUnselected.width, imgUnselected.height );
            this.state                  = Button.BUTTON_STATE_UNSELECTED;
            this.accordingMenuScheme    = null;
            this.menuIndex              = 0;
        }

        /*****************************************************************************
        *   Draws all buttons in the given array.
        * 
        *   @param  buttons     An array of buttons.
        *****************************************************************************/
        Button.drawButtons = function( buttons )
        {
            for ( var i = 0; i < buttons.length; ++i )
            {
                Button.drawButton( buttons[ i ] );
            }
        }

        /*****************************************************************************
        *   Draws the specified button.
        * 
        *   @param  button  The button to draw.
        *****************************************************************************/
        Button.drawButton = function( button )
        {
            //draw button according to state
            switch ( button.state )
            {
                case Button.BUTTON_STATE_UNSELECTED:
                case Button.BUTTON_STATE_HOVER_OUT:
                {
                    Drawing.drawImage( button.imgUnselected, button.rect.left, button.rect.top, Anchor.LEFT_TOP );
                    break;
                }

                case Button.BUTTON_STATE_HOVER_IN:
                {
                    Drawing.drawImage( button.imgHover, button.rect.left, button.rect.top, Anchor.LEFT_TOP );
                    break;
                }

                case Button.BUTTON_STATE_SELECTED:
                {
                    Drawing.drawImage( button.imgSelected, button.rect.left, button.rect.top, Anchor.LEFT_TOP );
                    break;
                }
            }   
        }

        /*****************************************************************************
        *   Performs a pointer-down for all given buttons.
        *****************************************************************************/
        Button.delegatePointerDownToButtons = function( buttons, pointerX, pointerY )
        {
            //alert( "check 4" );
            
            //delegate pointer down to all given buttons
            for ( var i = 0; i < buttons.length; ++i )
            {
                Button.delegatePointerDownToButton( buttons[ i ], pointerX, pointerY );                
            }            
        }
        
        /*****************************************************************************
        *   Performs a pointer-up for all given buttons.
        *****************************************************************************/
        Button.delegatePointerUpToButtons = function( buttons, pointerX, pointerY )
        {
            //delegate pointer up to all given buttons
            for ( var i = 0; i < buttons.length; ++i )
            {
                Button.delegatePointerUpToButton( buttons[ i ], pointerX, pointerY );                
            }            
        }

        /*****************************************************************************
        *   Performs a pointer-move for all given buttons.
        *****************************************************************************/
        Button.delegatePointerMoveToButtons = function( buttons, pointerX, pointerY )
        {
            //delegate pointer move to all given buttons
            for ( var i = 0; i < buttons.length; ++i )
            {
                Button.delegatePointerMoveToButton( buttons[ i ], pointerX, pointerY );                
            }            
        }
        
        /*****************************************************************************
        *   Performs a pointer-down for the given button.
        *****************************************************************************/
        Button.delegatePointerDownToButton = function( button, pointerX, pointerY )
        {
            //alert( "delegate pointer down to [" + pointerX + "," + pointerY + "]" );
            
            switch ( button.state )
            {
                case Button.BUTTON_STATE_UNSELECTED:
                {
                    //check if click is inside the button
                    if ( button.rect.containsPoint( pointerX, pointerY ) )
                    {
                        //change state to 'hover in'
                        button.state = Button.BUTTON_STATE_HOVER_IN;       
                        
                        //select this menu index for according menu scheme
                        button.accordingMenuScheme.setNewMenuIndex( button.menuIndex );
                    }
                    break;    
                }   
                case Button.BUTTON_STATE_HOVER_IN:
                case Button.BUTTON_STATE_HOVER_OUT:
                case Button.BUTTON_STATE_SELECTED:
                {
                    //ignore this press
                    break;   
                }
            }
        }

        /*****************************************************************************
        *   Performs a pointer-up for the given button.
        *****************************************************************************/
        Button.delegatePointerUpToButton = function( button, pointerX, pointerY )
        {
            switch ( button.state )
            {
                case Button.BUTTON_STATE_HOVER_IN:
                {
                    //select according action
                    button.state = Button.BUTTON_STATE_SELECTED;
                
                    //perform action
                    button.accordingMenuScheme.selectMenuIndex();
                    
                    break;    
                }
                
                case Button.BUTTON_STATE_HOVER_OUT:
                {
                    button.state = Button.BUTTON_STATE_UNSELECTED;
                    break;    
                }
                
                case Button.BUTTON_STATE_SELECTED:
                case Button.BUTTON_STATE_UNSELECTED:
                {
                    //ignore this release
                    break;   
                }
            }            
        }

        /*****************************************************************************
        *   Performs a pointer-move for the given button.
        *****************************************************************************/
        Button.delegatePointerMoveToButton = function( button, pointerX, pointerY )
        {
            switch ( button.state )
            {
                case Button.BUTTON_STATE_HOVER_IN:
                {
                    //blur focus if pointer is dragged outside of the button
                    if ( !button.rect.containsPoint( pointerX, pointerY ) )
                    {
                        //only for mouse devices and if mouse is up
                        if ( Pointer.pointerSource == Pointer.SOURCE_MOUSE && !Pointer.mouseDown )
                        {                    
                            //change state to 'unselected'
                            button.state = Button.BUTTON_STATE_UNSELECTED;
                        }
                        else
                        {
                            //change state to 'hover out'
                            button.state = Button.BUTTON_STATE_HOVER_OUT;
                        }                        
                    }
                    break;    
                }
                
                case Button.BUTTON_STATE_HOVER_OUT:
                {
                    //regain focus if pointer is dragged inside of the button again
                    if ( button.rect.containsPoint( pointerX, pointerY ) )
                    {
                        //change state to 'hover out'
                        button.state = Button.BUTTON_STATE_HOVER_IN;                        
                    }
                    break;                    
                }
                
                case Button.BUTTON_STATE_SELECTED:
                {
                    
                    break;
                }
                
                case Button.BUTTON_STATE_UNSELECTED:
                {
                    //only for mouse devices and if mouse is up
                    if ( Pointer.pointerSource == Pointer.SOURCE_MOUSE && !Pointer.mouseDown )
                    {
                        //check if pointer hovers over button
                        if ( button.rect.containsPoint( pointerX, pointerY ) )
                        {
                            //change state to 'hover in'
                            button.state = Button.BUTTON_STATE_HOVER_IN;       
                            
                            //select this menu index for according menu scheme
                            button.accordingMenuScheme.setNewMenuIndex( button.menuIndex );
                        }
                    }
                    break;   
                }
            }            
        }
    }
