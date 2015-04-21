/*  $Id: Debug.js 31850 2011-08-03 11:24:23Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   The debug system contains switchable debug groups
    *   that generate output to the screen console.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31850 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/Debug.js $
    *****************************************************************************/
    var     Debug                           = new Object();
    { 
        /*****************************************************************************
        *   Constructs a new debug group. 
        *   MUST be declared before used.
        *****************************************************************************/
        Debug.constructor = function( aDebugEnabled )
        {
            this.debugEnabled   = aDebugEnabled;
            this.log            = Debug.log;
        }

        Debug.log = function( msg )
        {
            //only perform log if the debug flag for this debug group is enabled
            if ( this.debugEnabled )
            {
                Console.append( msg );
            }
        }
        
        Debug.acclaim                   = new Debug.constructor( false  );
        Debug.buttons                   = new Debug.constructor( false  );
        Debug.hid                       = new Debug.constructor( false  );
        Debug.sound                     = new Debug.constructor( false  );
    }
