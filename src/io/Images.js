/*  $Id: Images.js 31916 2011-08-04 09:34:43Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Handles all images the application makes use of.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31916 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Images.js $
    *****************************************************************************/
    var     Images                          = new Object();
    {
        Images.PRELOADER_INDICES            = 1;
        
        Images.loadedCount                  = 0;

        Images.PRELOADER_NUMBERS            = "global/numbers.png";
        Images.MENU_PIC_START               = "menu/menu_pic_start.jpg";                   
        Images.MENU_PIC_LOAD                = "menu/menu_pic_load.jpg";                  
        Images.MENU_PIC_EXTRAS              = "menu/menu_pic_extras.jpg";                 
        Images.MENU_PIC_CREDITS             = "menu/menu_pic_credits.jpg";                
        Images.MENU_HELP                    = "menu/text_menu_help.png";               
        Images.MENU_CONSTRUCTION_ICON       = "menu/text_menu_site.png";              
        Images.MENU_DISCLAIMER_1            = "menu/text_menu_disclaimer1.png";       
        Images.MENU_DISCLAIMER_2            = "menu/text_menu_disclaimer2.png"; 
        Images.MENU_START_SELECTED          = "menu/item_start_game_selected.png";    
        Images.MENU_LOAD_SELECTED           = "menu/item_load_game_selected.png";     
        Images.MENU_EXTRAS_SELECTED         = "menu/item_extras_selected.png";        
        Images.MENU_CREDITS_SELECTED        = "menu/item_credits_selected.png";       
        Images.MENU_START_UNSELECTED        = "menu/item_start_game_unselected.png";  
        Images.MENU_LOAD_UNSELECTED         = "menu/item_load_game_unselected.png";   
        Images.MENU_EXTRAS_UNSELECTED       = "menu/item_extras_unselected.png";      
        Images.MENU_CREDITS_UNSELECTED      = "menu/item_credits_unselected.png"; 
        Images.MENU_START_HOVER             = "menu/item_start_game_hover.png";    
        Images.MENU_LOAD_HOVER              = "menu/item_load_game_hover.png";     
        Images.MENU_EXTRAS_HOVER            = "menu/item_extras_hover.png";        
        Images.MENU_CREDITS_HOVER           = "menu/item_credits_hover.png";       
        Images.MENU_HTML_5                  = "menu/text_html5.png";                       
        Images.MENU_TITLE                   = "menu/text_title.png";  
        Images.GAME_ITEM_STRAWBERRY         = "game/item_strawberry.png";  
        Images.GAME_ITEM_ORANGE             = "game/item_orange.png";  
        Images.GAME_ITEM_CHERRY             = "game/item_cherry.png";  
        Images.GAME_ITEM_PEAR               = "game/item_pear.png";  
        Images.GAME_ITEM_APPLE              = "game/item_apple.png"; 
        Images.GAME_ITEM_COIN               = "game/item_coin.png"; 
        Images.GAME_PLAYER_WALK_LEFT        = "player/player_walk_left.png"; 
        Images.GAME_PLAYER_WALK_RIGHT       = "player/player_walk_right.png"; 
        Images.GAME_PLAYER_STAND_LEFT       = "player/player_stand_left.png"; 
        Images.GAME_PLAYER_STAND_RIGHT      = "player/player_stand_right.png"; 
        Images.GAME_HELP                    = "game/text_game_help.png";           
        Images.GAME_PAWSED                  = "game/text_pawsed.png";              
        Images.GAME_PAWSE_HELP              = "game/text_paws_help.png";           
        Images.GAME_FLOOR_STONES_1          = "floor/floor_stones1.png";           
        Images.GAME_FLOOR_STONES_2          = "floor/floor_stones2.png";           
        Images.GAME_FLOOR_STONES_3          = "floor/floor_stones3.png";           
        Images.GAME_FLOOR_STONES_4          = "floor/floor_stones4.png";           
        Images.GAME_FLOOR_STONES_5          = "floor/floor_stones5.png";           
        Images.GAME_FLOOR_STONES_6          = "floor/floor_stones6.png";           
        Images.GAME_LEVEL_1                 = "game/text_level1.png";              
        Images.GAME_LEVEL_1_CAPTION         = "game/text_level1_caption.png";      
        Images.GAME_BG_HILL                 = "bg/bg_hill.jpg"; 
        Images.GAME_BG_TREES                = "bg/bg_trees.png"; 
        Images.GAME_BUTTON_LEFT             = "global/buttonLeft.jpg"; 
        Images.GAME_BUTTON_RIGHT            = "global/buttonRight.jpg"; 
        Images.GAME_BUTTON_UP               = "global/buttonUp.jpg"; 
        Images.GAME_BUTTON_DOWN             = "global/buttonDown.jpg"; 
        Images.GAME_BUTTON_ENTER            = "global/buttonEnter.jpg"; 
        Images.GAME_BUTTON_ESCAPE           = "global/buttonEscape.jpg"; 
        Images.GAME_ENEMY_1                 = "enemies/enemy1.png"; 

        Images.FILE_NAMES                   = new Array
        (
            Images.PRELOADER_NUMBERS       ,
            Images.MENU_PIC_START          ,
            Images.MENU_PIC_LOAD           ,
            Images.MENU_PIC_EXTRAS         ,
            Images.MENU_PIC_CREDITS        ,
            Images.MENU_HELP               ,
            Images.MENU_CONSTRUCTION_ICON  ,
            Images.MENU_DISCLAIMER_1       ,
            Images.MENU_DISCLAIMER_2       ,
            Images.MENU_START_SELECTED     ,
            Images.MENU_LOAD_SELECTED      ,
            Images.MENU_EXTRAS_SELECTED    ,
            Images.MENU_CREDITS_SELECTED   ,
            Images.MENU_START_UNSELECTED   ,
            Images.MENU_LOAD_UNSELECTED    ,
            Images.MENU_EXTRAS_UNSELECTED  ,
            Images.MENU_CREDITS_UNSELECTED ,
            Images.MENU_START_HOVER        ,
            Images.MENU_LOAD_HOVER         ,
            Images.MENU_EXTRAS_HOVER       ,
            Images.MENU_CREDITS_HOVER      ,
            Images.MENU_HTML_5             ,
            Images.MENU_TITLE              ,
            Images.GAME_ITEM_STRAWBERRY    ,
            Images.GAME_ITEM_ORANGE        ,
            Images.GAME_ITEM_CHERRY        ,
            Images.GAME_ITEM_PEAR          ,
            Images.GAME_ITEM_APPLE         ,
            Images.GAME_ITEM_COIN          ,
            Images.GAME_PLAYER_WALK_LEFT   ,
            Images.GAME_PLAYER_WALK_RIGHT  ,
            Images.GAME_PLAYER_STAND_LEFT  ,
            Images.GAME_PLAYER_STAND_RIGHT ,
            Images.GAME_HELP               ,
            Images.GAME_PAWSED             ,
            Images.GAME_PAWSE_HELP         ,
            Images.GAME_FLOOR_STONES_1     ,
            Images.GAME_FLOOR_STONES_2     ,
            Images.GAME_FLOOR_STONES_3     ,
            Images.GAME_FLOOR_STONES_4     ,
            Images.GAME_FLOOR_STONES_5     ,
            Images.GAME_FLOOR_STONES_6     ,
            Images.GAME_LEVEL_1            ,
            Images.GAME_LEVEL_1_CAPTION    ,
            Images.GAME_BG_HILL            ,
            Images.GAME_BG_TREES           ,
            Images.GAME_BUTTON_LEFT        ,
            Images.GAME_BUTTON_RIGHT       ,
            Images.GAME_BUTTON_UP          ,
            Images.GAME_BUTTON_DOWN        ,
            Images.GAME_BUTTON_ENTER       ,
            Images.GAME_BUTTON_ESCAPE      ,
            Images.GAME_ENEMY_1            
        );
        
        Images.allImages                    = new Array( Images.FILE_NAMES.length );
        
        Images.getImage = function( id )
        {
            return Images.allImages[ id ];            
        }

        Images.orderPreloaderImages = function()
        {
            for ( var i = 0; i < Images.PRELOADER_INDICES; ++i )
            {
                var imgPath = 0;
                if ( Canvas.TYPE == Canvas.TYPE_DESKTOP )
                {
                    imgPath = "images/desktop/" + Images.FILE_NAMES[ i ];
                }
                else
                {
                    imgPath =   "images/desktop/" + Images.FILE_NAMES[ i ];
                }
                Images.allImages[ Images.FILE_NAMES[ i ] ] = Images.loadImage( imgPath );     
            }
        }
        
        Images.orderRest = function()
        {
            for ( var i = Images.PRELOADER_INDICES; i < Images.FILE_NAMES.length; ++i )
            {
                var imgPath = 0;
                if ( Canvas.TYPE == Canvas.TYPE_DESKTOP )
                {
                    imgPath = "images/desktop/" + Images.FILE_NAMES[ i ];
                }
                else
                {
                    imgPath =   "images/desktop/" + Images.FILE_NAMES[ i ];
                }
                Images.allImages[ Images.FILE_NAMES[ i ] ] = Images.loadImage( imgPath );     
            }            
        }
        
        Images.loadImage = function( url )
        {
            var img     = new Image();
            img.src     = url;
            img.onload  = function() { Images.onImageLoaded(); };
            
            
            
            //scale images according to canvas [ not anti-aliased :( ) ]
            //img.width   = Math.round( img.width  * Canvas.SCALE_FACTOR );
            //img.height  = Math.round( img.height * Canvas.SCALE_FACTOR );
            
            return img;    
        }
        
        Images.onImageLoaded = function()  
        {
            ++Images.loadedCount;
            
            //Console.append( "img: " + Images.loadedCount );
/*         
            for ( var i = 0; i < Images.FILE_NAMES.length; ++i )
            {
                //Console.append( " > " + i );
                
                if ( Images.allImages[ i ] == null )
                {
                    Console.append( " missing: " + i );    
                }
            }
*/  
            
            
            
        }  
    }        
    