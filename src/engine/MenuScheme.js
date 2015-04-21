/*  $Id: MenuScheme.js 31862 2011-08-03 13:39:20Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a point in 2D space.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31862 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/engine/MenuScheme.js $
    *****************************************************************************/
    var     MenuScheme                          = new Object();
    { 
        /*****************************************************************************
        *   Constructs a new point in 2D space.
        *
        *   @param  x   Point's new x coordinate.
        *   @param  y   Point's new y coordinate.
        *****************************************************************************/
        MenuScheme.constructor = function( touchables, selectActions, menuPics )
        {
            //specify member fields
            this.touchables                         = touchables;  
            this.selectActions                      = selectActions;
            this.menuPics                           = menuPics;
            this.currentSelectedMenuIndex           = 0;
         
            //specify member functions   
            this.setNewMenuIndex                    = MenuScheme.setNewMenuIndex;
            this.selectMenuIndex                    = MenuScheme.selectMenuIndex;
            this.selectionNext                      = MenuScheme.selectionNext;
            this.selectionPrevious                  = MenuScheme.selectionPrevious;
            this.selectionConfirm                   = MenuScheme.selectionConfirm;
            this.getMenuPic                         = MenuScheme.getMenuPic;
            this.delegatePointerUp                  = MenuScheme.delegatePointerUp;
            this.delegatePointerDown                = MenuScheme.delegatePointerDown;
            this.delegatePointerMove                = MenuScheme.delegatePointerMove;
            this.drawAllButtons                     = MenuScheme.drawAllButtons;
            this.handleKeys                         = MenuScheme.handleKeys;
            
            //link this menu to all touchables
            for ( var i = 0; i < this.touchables.length; ++i )
            {
                this.touchables[ i ].accordingMenuScheme = this;
                this.touchables[ i ].menuIndex           = i;
            }
            
            //set initial menu index
            this.setNewMenuIndex( 0 );       
        }
        
        MenuScheme.selectionNext = function( pressed )
        {
            if ( pressed )
            {
                this.setNewMenuIndex( this.currentSelectedMenuIndex + 1 );
            }
        }
        
        MenuScheme.selectionPrevious = function( pressed )
        {
            if ( pressed )
            {
                this.setNewMenuIndex( this.currentSelectedMenuIndex - 1 );
            }
        }
        
        MenuScheme.selectionConfirm = function( pressed )
        {
            if ( pressed ) 
            {
                this.selectMenuIndex();
            }
        }

        MenuScheme.getMenuPic = function()
        {
            return this.menuPics[ this.currentSelectedMenuIndex ];
        }
        
        MenuScheme.setNewMenuIndex = function( newMenuIndex )
        {
            this.touchables[ this.currentSelectedMenuIndex ].state = Button.BUTTON_STATE_UNSELECTED;
            this.currentSelectedMenuIndex = newMenuIndex;
            if ( this.currentSelectedMenuIndex < 0                       ) this.currentSelectedMenuIndex = this.touchables.length - 1;
            if ( this.currentSelectedMenuIndex >= this.touchables.length ) this.currentSelectedMenuIndex = 0;
            this.touchables[ this.currentSelectedMenuIndex ].state = Button.BUTTON_STATE_HOVER_IN;
        }
        
        MenuScheme.selectMenuIndex = function()
        {
            this.touchables[ this.currentSelectedMenuIndex ].state = Button.BUTTON_STATE_SELECTED;
            Action.enqueueAction( this.selectActions[ this.currentSelectedMenuIndex ] );
            //alert( "action " + this.selectActions[ this.currentSelectedMenuIndex ] );
        }
        
        MenuScheme.delegatePointerUp = function( pointerX, pointerY )
        {
            Button.delegatePointerUpToButtons( this.touchables, pointerX, pointerY );
        }
        
        MenuScheme.delegatePointerDown = function( pointerX, pointerY )
        {
            Button.delegatePointerDownToButtons( this.touchables, pointerX, pointerY );
        }
        
        MenuScheme.delegatePointerMove = function( pointerX, pointerY )
        {
            Button.delegatePointerMoveToButtons( this.touchables, pointerX, pointerY );
        }
        
        MenuScheme.drawAllButtons = function()
        {
            Button.drawButtons( this.touchables );
        }
        
        MenuScheme.handleKeys = function( pressedNext, pressedPrevious, pressedConfirm )
        {
            //confirm item or change to next / previous item
            this.selectionConfirm(  pressedConfirm  );
            this.selectionNext(     pressedNext     );
            this.selectionPrevious( pressedPrevious );
        }
    }
