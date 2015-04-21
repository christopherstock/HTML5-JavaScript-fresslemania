/*  $Id: UMath.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Offers additional math functionality.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/util/UMath.js $
    *****************************************************************************/
    var     UMath                           = new Object();
    { 
        /*****************************************************************************
        *   Delivers the sin value of the given angle in degrees.
        * 
        *   @param  degrees     An angle to get the sin for. Not in radiants but in degrees.
        *   @return             The sin-value for the specified angle.
        *****************************************************************************/        
        UMath.sinDeg = function ( degrees )
        {
            return Math.sin( degrees * Math.PI / 180.0 );
        }
    
        /*****************************************************************************
        *   Delivers the cos value of the given angle in degrees.
        * 
        *   @param  degrees     An angle to get the cos for. Not in radiants but in degrees.
        *   @return             The cos-value for the specified angle.
        *****************************************************************************/        
        UMath.cosDeg = function( degrees )
        {
            return Math.cos( degrees * Math.PI / 180.0 );
        }
    
        /*****************************************************************************
        *   Returns the distant point from a specified point and distance.
        * 
        *   @param  pnt         The center point.
        *   @param  degrees     The angle for the distance. In degrees.
        *   @param  distX       The distance X from center.
        *   @param  distY       The distance Y from center.
        *   @return             The distant point. 
        *****************************************************************************/        
        UMath.sinCosPoint = function( pnt, degrees, distX, distY )
        {
            return new Point2D.constructor
            (
                pnt.x + UMath.cosDeg( degrees ) * distX,
                pnt.y + UMath.sinDeg( degrees ) * distY
            );
        }
    }
    