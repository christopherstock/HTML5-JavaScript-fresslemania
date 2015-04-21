/*  $Id: Point2D.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a point in 2D space.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/engine/Point2D.js $
    *****************************************************************************/
    var     Point2D                         = new Object();
    { 
        /*****************************************************************************
        *   Constructs a new point in 2D space.
        *
        *   @param  x   Point's new x coordinate.
        *   @param  y   Point's new y coordinate.
        *****************************************************************************/
        Point2D.constructor = function( x, y )
        {
            this.x = x;
            this.y = y;
        }
    }
