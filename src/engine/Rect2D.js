/*  $Id: Rect2D.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Represents a rectangular in 2D space.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/engine/Rect2D.js $
    *****************************************************************************/
    var     Rect2D                          = new Object();
    { 
        Rect2D.ELEVATION_NONE               = 0;
        Rect2D.ELEVATION_ASCENDING          = 1;
        Rect2D.ELEVATION_DESCENDING         = 2;        
        
        /*****************************************************************************
        *   Constructs a new rectangular.
        *
        *   @param  x       Location x for the new rect.
        *   @param  y       Location y for the new rect.
        *   @param  width   Width for the new rect.
        *   @param  Height  Height for the new rect.
        *****************************************************************************/
        Rect2D.constructor = function( x, y, width, height )
        {
            this.left                       = x;
            this.top                        = y;
            this.width                      = width;
            this.height                     = height;
            
            this.containsPoint              = Rect2D.containsPoint;
            this.rectsCollide               = Rect2D.collidesWithRect;
            this.getYonCollisionXrect       = Rect2D.getYonCollisionXrect;
            this.equalsWithRect             = Rect2D.equalsWithRect;
        }

        /*****************************************************************************
        *   Checks if the given rect contains the given point.
        *
        *   @param  rect1   Rect to check point containment.
        *   @param  x       Point x.
        *   @param  y       Point y.
        *   @return         <code>true</code> if the point lies in the rectangle.
        *                   Otherwise <code>false</code>.
        *****************************************************************************/     
        Rect2D.containsPoint = function( x, y )
        {
            var ret = 
            (
                    x  >=  this.left
                &&  x  <   this.left    + this.width  
                &&  y  >=  this.top
                &&  y  <   this.top     + this.height
            );        
            return ret;      
        }
        
        /*****************************************************************************
        *   Checks if the two given rects intersect.
        *
        *   @param  rect2   2nd rect to check for intersection.
        *   @return         <code>true</code> if the rects collide.
        *                   Otherwise <code>false</code>.
        *****************************************************************************/        
        Rect2D.collidesWithRect = function( rect2 )
        {
            var ret =
            (
                    !this.equalsWithRect( rect2 )
                &&  this.left + this.width     >  rect2.left 
                &&  this.left                  <  rect2.left + rect2.width  
                &&  this.top  + this.height    >  rect2.top 
                &&  this.top                   <  rect2.top + rect2.height
            );
            return ret;
        }
        
        Rect2D.getYonCollisionXrect = function( rect2, elevated )
        {
            if 
            ( 
                    !this.equalsWithRect( rect2 )
                &&  this.left                  < rect2.left + rect2.width 
                &&  this.left + this.width    > rect2.left 
            )        
            {
                switch ( elevated )
                {
                    case Rect2D.ELEVATION_DESCENDING:
                    {
                        //calculate elevated height
                        var progress   = rect2.left - this.left;
                        if ( progress < 0           ) progress = 0;
                        if ( progress > this.width ) progress = this.width;
                        var collisionY = ( this.height * progress / this.width );
                        var ret        = this.top + collisionY;
                        return ret;
                        break;    
                    }   
                    case Rect2D.ELEVATION_ASCENDING:
                    {
                        //calculate elevated height
                        var progress = rect2.left + rect2.width - this.left;
                        if ( progress < 0           ) progress = 0;
                        if ( progress > this.width ) progress = this.width;
                        var collisionY = this.height - ( this.height * progress / this.width );
                        var ret        = this.top + collisionY;
                        return ret;
                        break;    
                    }   
                    default:
                    {
                        return this.top;
                        break;    
                    }   
                }
            }
            
            return -1;        
        }
        
        Rect2D.equalsWithRect = function( rect2 )
        {
            var ret =
            (
                    this.left      ==  rect2.left 
                &&  this.width     ==  rect2.width  
                &&  this.top       ==  rect2.top
                &&  this.height    ==  rect2.height
            );
            return ret;
        }
    }
