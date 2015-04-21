/*  $Id: Enemies.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents an ememy that could kill the player.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/game/Enemies.js $
    *****************************************************************************/
    var     Enemy                           = new Object();
    {
        Enemy.animateEnemies = function( enemies )
        {
            //move all enemies towards the player
            for ( var i = 0; i < enemies.length; ++i )
            {
                if ( !enemies[ i ].dead )
                {
                    //enemies[ i ].moveRight();
                    if ( enemies[ i ].block.rect.left > Level.current.player.block.rect.left )
                    {
                        //move left
                        enemies[ i ].moveLeft();
                        
                        //animate frame
                        enemies[ i ].block.animateBlock();
                    }
                    else if ( enemies[ i ].block.rect.left < Level.current.player.block.rect.left )
                    {
                        //move right
                        enemies[ i ].moveRight();
                        
                        //animate frame
                        enemies[ i ].block.animateBlock();
                    }
                    else
                    {
                        //do not move but animate frame
                        enemies[ i ].block.animateBlock();
                    }
                  
                    //handle enemy jumping / falling
                    enemies[ i ].handleY();
                }
            }
        }
    }
