/*  $Id: Menu.js 31862 2011-08-03 13:39:20Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   All menu related stuff.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31862 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/state/Menu.js $
    *****************************************************************************/
    var     Menu                            = new Object();
    {
        Menu.MENU_ITEM_START_GAME           = 0;
        Menu.MENU_ITEM_LOAD_GAME            = 1;
        Menu.MENU_ITEM_EXTRAS               = 2;
        Menu.MENU_ITEM_CREDITS              = 3;
        Menu.MENU_INDICES                   = 4;
        
        Menu.schemeMainMenu               	= null;
        
        /*****************************************************************************
        *   Init the menu touchables.
        *****************************************************************************/
        Menu.resetMainMenu = function() 
        {
            //set menu scheme
            var marginX = ( Canvas.WIDTH - Images.getImage( Images.MENU_TITLE ).width ) / 2;
            Menu.schemeMainMenu = new MenuScheme.constructor
            (
                //touchables
                new Array
                (
                    new Button.constructor( Canvas.WIDTH - marginX - Images.getImage( Images.MENU_PIC_START ).width - Images.getImage( Images.MENU_CONSTRUCTION_ICON ).width - 20, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 0 * Images.getImage( Images.MENU_START_UNSELECTED ).height, Images.getImage( Images.MENU_START_UNSELECTED   ), Images.getImage( Images.MENU_START_HOVER   ), Images.getImage( Images.MENU_START_SELECTED   ) ),
                    new Button.constructor( Canvas.WIDTH - marginX - Images.getImage( Images.MENU_PIC_START ).width - Images.getImage( Images.MENU_CONSTRUCTION_ICON ).width - 20, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 1 * Images.getImage( Images.MENU_START_UNSELECTED ).height, Images.getImage( Images.MENU_LOAD_UNSELECTED    ), Images.getImage( Images.MENU_LOAD_HOVER    ), Images.getImage( Images.MENU_LOAD_SELECTED    ) ),
                    new Button.constructor( Canvas.WIDTH - marginX - Images.getImage( Images.MENU_PIC_START ).width - Images.getImage( Images.MENU_CONSTRUCTION_ICON ).width - 20, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 2 * Images.getImage( Images.MENU_START_UNSELECTED ).height, Images.getImage( Images.MENU_EXTRAS_UNSELECTED  ), Images.getImage( Images.MENU_EXTRAS_HOVER  ), Images.getImage( Images.MENU_EXTRAS_SELECTED  ) ),
                    new Button.constructor( Canvas.WIDTH - marginX - Images.getImage( Images.MENU_PIC_START ).width - Images.getImage( Images.MENU_CONSTRUCTION_ICON ).width - 20, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 3 * Images.getImage( Images.MENU_START_UNSELECTED ).height, Images.getImage( Images.MENU_CREDITS_UNSELECTED ), Images.getImage( Images.MENU_CREDITS_HOVER ), Images.getImage( Images.MENU_CREDITS_SELECTED ) )
                ),          
                //select actions      
                new Array
                (
                    Action.ACTION_MENU_START_GAME,
                    Action.ACTION_MENU_LOAD_GAME,
                    Action.ACTION_MENU_EXTRAS,
                    Action.ACTION_MENU_CREDITS
                ),
                //menu pics
                new Array
                (
                    Images.getImage( Images.MENU_PIC_START ),
                    Images.getImage( Images.MENU_PIC_LOAD ),
                    Images.getImage( Images.MENU_PIC_EXTRAS ),
                    Images.getImage( Images.MENU_PIC_CREDITS )
                )
            );
        }

        /*****************************************************************************
        *   Tick the menu.
        *****************************************************************************/
        Menu.tickMenu = function()
        {
        }
        
        /*****************************************************************************
        *   Draw the menu state.
        *****************************************************************************/
        Menu.drawMenu = function()
        {
        	//clear screen
            Drawing.fillCanvas( "rgb( 0, 0, 0 )" );
        
            var marginX = ( Canvas.WIDTH - Images.getImage( Images.MENU_TITLE ).width ) / 2;
        
            //draw menu pic
            Drawing.drawImage( Menu.schemeMainMenu.getMenuPic(), marginX, Canvas.HEIGHT / 2, Anchor.LEFT_MIDDLE );

            //draw title text
            Drawing.drawImage( Images.getImage( Images.MENU_TITLE ), Canvas.WIDTH / 2, 10, Anchor.CENTER_TOP );
            
            //draw menu help ( if keys are done again :p ) 
            //Drawing.drawImage( Images.getImage( Images.MENU_HELP ), Canvas.WIDTH - marginX - Images.getImage( Images.MENU_PIC_START ).width - Images.getImage( Images.MENU_CONSTRUCTION_ICON ).width - 20, ( Canvas.HEIGHT + Images.getImage( Images.MENU_PIC_START ).height ) / 2 - Images.getImage( Images.MENU_HELP ).height / 2, Anchor.LEFT_TOP );
    
            //draw 'under construction' icons
            Drawing.drawImage( Images.getImage( Images.MENU_CONSTRUCTION_ICON ), Canvas.WIDTH - marginX, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 1 * Images.getImage( Images.MENU_START_SELECTED ).height, Anchor.RIGHT_TOP );
            Drawing.drawImage( Images.getImage( Images.MENU_CONSTRUCTION_ICON ), Canvas.WIDTH - marginX, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 2 * Images.getImage( Images.MENU_START_SELECTED ).height, Anchor.RIGHT_TOP );
            Drawing.drawImage( Images.getImage( Images.MENU_CONSTRUCTION_ICON ), Canvas.WIDTH - marginX, ( Canvas.HEIGHT - Images.getImage( Images.MENU_PIC_START ).height ) / 2 + 3 * Images.getImage( Images.MENU_START_SELECTED ).height, Anchor.RIGHT_TOP );
        
            //draw html5 logo
            Drawing.drawImage( Images.getImage( Images.MENU_HTML_5 ), Canvas.WIDTH / 2, Canvas.HEIGHT - 20, Anchor.CENTER_BOTTOM );
            
            //draw menu disclaimer
            Drawing.drawImage( Images.getImage( Images.MENU_DISCLAIMER_1 ), marginX,                Canvas.HEIGHT - 20, Anchor.LEFT_BOTTOM  );
            Drawing.drawImage( Images.getImage( Images.MENU_DISCLAIMER_2 ), Canvas.WIDTH - marginX, Canvas.HEIGHT - 20, Anchor.RIGHT_BOTTOM );
        }

        /*****************************************************************************
        *   Handle keys being pressed in the menu.
        *****************************************************************************/
        Menu.handleKeys = function()
        {
            //let all keys be handled by the main scheme
            Menu.schemeMainMenu.handleKeys( Key.KEY_DOWN.hold, Key.KEY_UP.hold, ( Key.KEY_ENTER.hold || Main.SKIP_MAIN_MENU ) );
            
            if ( Key.KEY_UP.hold    ) Key.KEY_UP.ignoreTillNextRelease();
            if ( Key.KEY_DOWN.hold  ) Key.KEY_DOWN.ignoreTillNextRelease();
            if ( Key.KEY_ENTER.hold ) Key.KEY_ENTER.ignoreTillNextRelease();
        }
        
        Menu.drawMenuTouchables = function()
        {
            //draw all touchables
            Menu.schemeMainMenu.drawAllButtons();
        }

        Menu.delegatePointerUp = function( pointerX, pointerY )
        {
            //delegate pointer up to all touchables
            Menu.schemeMainMenu.delegatePointerUp( pointerX, pointerY );
        }

        Menu.delegatePointerDown = function( pointerX, pointerY )
        {
            //delegate pointer down to all touchables
            Menu.schemeMainMenu.delegatePointerDown( pointerX, pointerY );
        }
        
        Menu.delegatePointerMove = function( pointerX, pointerY )
        {
            //delegate pointer move to all touchables
            Menu.schemeMainMenu.delegatePointerMove( pointerX, pointerY );
        }
    }
