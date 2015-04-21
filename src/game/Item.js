/*  $Id: Item.js 31916 2011-08-04 09:34:43Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a collectable item.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31916 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Item.js $
    *****************************************************************************/
    var     Item                            = new Object();
    {    
        Item.ITEM_TYPE_APPLE                = 0;
        Item.ITEM_TYPE_CHERRY               = 1;
        Item.ITEM_TYPE_ORANGE               = 2;
        Item.ITEM_TYPE_PEAR                 = 3;
        Item.ITEM_TYPE_STRAWBERRY           = 4;
        Item.ITEM_TYPE_COIN                 = 5;

        Item.constructor = function( x, y, template ) 
        {
            this.template       = template;
            this.block          = new Block.constructor( x, y, this.template.sprite, Block.BLOCK_TYPE_ENEMY, Rect2D.ELEVATION_NONE, this.template.swings );
            this.picked         = false;
            this.frame          = 0;
            this.draw           = Item.draw;
            this.checkCollision = Item.checkCollision;   
            this.animate        = Item.animate;
        }

        Item.drawAll = function( items, camera )
        {
            //browse all items    
            for ( var i = 0; i < items.length; ++i )
            {
                //draw if not picked
                if ( !items[ i ].picked ) 
                {
                    items[ i ].draw( camera );
                }
            }
        }

        Item.draw = function( camera )
        {
            this.block.drawBlock( camera );
        }

        Item.checkCollisionAll = function( items, rect )
        {
            //browse all items    
            for ( var i = 0; i < items.length; ++i )
            {
                //check if not picked
                if ( !items[ i ].picked )
                {    
                    items[ i ].checkCollision( rect );
                }
            }
        }
        
        Item.checkCollision = function( rect )
        {
            //check player collision
            if ( this.block.rect.rectsCollide( rect ) )
            {
                //play pick sound
                Sound.playSound( this.template.pickSound );
    
                //flag item as picked                    
                this.picked = true;
                
                //perform action according to fx type
                switch ( this.template.fx )
                {
                    case ItemType.ITEM_FX_POINTS_100:
                    {
                        Level.current.gainPoints( 100 );
                        break;
                    }
                    case ItemType.ITEM_FX_POINTS_200:
                    {
                        Level.current.gainPoints( 200 );
                        break;
                    }
                    case ItemType.ITEM_FX_POINTS_300:
                    {
                        Level.current.gainPoints( 300 );
                        break;
                    }
                    case ItemType.ITEM_FX_POINTS_400:
                    {
                        Level.current.gainPoints( 400 );
                        break;
                    }
                    case ItemType.ITEM_FX_POINTS_500:
                    {
                        Level.current.gainPoints( 500 );
                        break;
                    }
                    case ItemType.ITEM_FX_COIN_1:
                    {
                        Level.current.gainCoins( 1 );
                        break;
                    }
                }
            }
        }
    
        Item.animateAll = function( items )
        {
            //browse all items    
            for ( var i = 0; i < items.length; ++i )
            {
                //animate if not picked
                if ( !items[ i ].picked )
                {
                    items[ i ].animate();
                }
            }
        }
        
        Item.animate = function()
        {
            //animate the block
            this.block.animateBlock();
        }
    }
