/*  $Id: Console.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The on-screen debug-console.
    * 
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/util/Console.js $
    *****************************************************************************/
    var     Console                         = new Object();
    {
        Console.allLines                    = new Array();

        /*****************************************************************************
        *   Draws a line in the console.
        *****************************************************************************/
        Console.append = function( line )
        {
            if ( Main.LOG_TO_SCREEN ) 
            {
                //append as last element
                Console.allLines.push( line );
                
                //pop first element if size exceeds
                if ( Console.allLines.length > ( Canvas.HEIGHT - 2 * 25 ) / 20 ) 
                {
                    Console.allLines.shift();
                }
            }
        }

        /*****************************************************************************
        *   Draw all lines of the debug console onto the screen.
        *****************************************************************************/
        Console.draw = function()
        {
            var y = Canvas.HEIGHT - 25;
            for ( var i = Console.allLines.length - 1; i >= 0; --i )
            {
                Drawing.drawTextOutlined( Console.allLines[ i ], 25, y, "#000000", "#ffffff", "20px Verdana", Anchor.LEFT_BOTTOM );                
                y -= 20;
            }
        }
    }
