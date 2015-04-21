/*  $Id: ItemType.js 31920 2011-08-04 09:45:56Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a collectable item.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31920 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/ItemType.js $
    *****************************************************************************/
    var     ItemType                        = new Object();
    {
        ItemType.ITEM_FX_POINTS_100         = 0;
        ItemType.ITEM_FX_POINTS_200         = 1;
        ItemType.ITEM_FX_POINTS_300         = 2;
        ItemType.ITEM_FX_POINTS_400         = 3;
    	ItemType.ITEM_FX_POINTS_500			= 4;
        ItemType.ITEM_FX_COIN_1             = 5;
    
        ItemType.ITEM_TYPE_APPLE            = null;
        ItemType.ITEM_TYPE_CHERRY           = null;
        ItemType.ITEM_TYPE_ORANGE           = null;
        ItemType.ITEM_TYPE_PEAR             = null;
        ItemType.ITEM_TYPE_STRAWBERRY       = null;
        ItemType.ITEM_TYPE_COIN             = null;

        ItemType.constructor = function( swings, sprite, fx, pickSound )
        {
            this.swings     = swings;
            this.sprite     = sprite;
            this.fx         = fx;
            this.pickSound  = pickSound;
        }

        ItemType.init = function()
        {
            ItemType.ITEM_TYPE_COIN         = new ItemType.constructor( false, Sprite.COIN,        ItemType.ITEM_FX_COIN_1,     Sound.SOUND_FX_1 );
            ItemType.ITEM_TYPE_APPLE        = new ItemType.constructor( true,  Sprite.APPLE,       ItemType.ITEM_FX_POINTS_500, Sound.SOUND_FX_1 );
            ItemType.ITEM_TYPE_CHERRY       = new ItemType.constructor( true,  Sprite.CHERRY,      ItemType.ITEM_FX_POINTS_100, Sound.SOUND_FX_1 );  
            ItemType.ITEM_TYPE_ORANGE       = new ItemType.constructor( true,  Sprite.ORANGE,      ItemType.ITEM_FX_POINTS_200, Sound.SOUND_FX_1 );
            ItemType.ITEM_TYPE_PEAR         = new ItemType.constructor( true,  Sprite.PEAR,        ItemType.ITEM_FX_POINTS_300, Sound.SOUND_FX_1 );         
            ItemType.ITEM_TYPE_STRAWBERRY   = new ItemType.constructor( true,  Sprite.STRAWBERRY,  ItemType.ITEM_FX_POINTS_400, Sound.SOUND_FX_1 );          
        }
    }
