/*  $Id: Sound.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Carries all possible anchors a drawing object can have.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Sound.js $
    *****************************************************************************/
    var     Sound                           = new Object();
    {
        Sound.SOUND_BG_1                    = "bg1";
        Sound.SOUND_FX_1                    = "fx1";
        Sound.SOUND_FX_2_GNASH              = "fx2";

        Sound.canPlayMp3                    = false;
        Sound.canPlayOgg                    = false;
        Sound.canPlayWav                    = false;
        
        Sound.extension                     = "";
        
        Sound.init = function()
        {
            //check support
            var myAudio = document.createElement( "audio" );
            if ( myAudio.canPlayType )
            {
                Sound.canPlayMp3 = ( myAudio.canPlayType && "" != myAudio.canPlayType( 'audio/mpeg'                    ) );
                Sound.canPlayOgg = ( myAudio.canPlayType && "" != myAudio.canPlayType( 'audio/ogg; codecs="vorbis"'    ) );
                Sound.canPlayWav = ( myAudio.canPlayType && "" != myAudio.canPlayType( 'audio/wave'                    ) );

                if ( Sound.canPlayMp3 )
                {
                    Sound.extension = "_mp3";
                }
                else if ( Sound.canPlayWav )
                {
                    Sound.extension = "_wav";
                } 
/*                
                else if ( Sound.canPlayOgg && false )
                {
                    Sound.extension = "_ogg";
                }
*/                
                Debug.sound.log( "mp3 [" + Sound.canPlayMp3 + "] ogg [" + Sound.canPlayOgg + "] wav [" + Sound.canPlayWav + "]" );
            }
        }

        Sound.playSound = function( id )
        {
            if ( Settings.MUTE ) return;
            
            var audioElement = document.getElementById( id + Sound.extension );
            if ( audioElement )
            {
                if ( audioElement.currentTime > 0 )
                {                
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }
                audioElement.play();
            }
        }
        
        Sound.stopSound = function( id )
        {
            if ( Settings.MUTE ) return;
            
            var audioElement = document.getElementById( id + Sound.extension );
            if ( audioElement )
            {
                if ( audioElement.currentTime > 0 )
                {                
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }
            }
        }
        
        Sound.pauseSound = function( id )
        {
            if ( Settings.MUTE ) return;
            
            var audioElement = document.getElementById( id + Sound.extension );
            if ( audioElement )
            {
                if ( audioElement.currentTime > 0 )
                {                
                    audioElement.pause();
                }
            }
        }
        
        Sound.resumeSound = function( id )
        {
            if ( Settings.MUTE ) return;
            
            var audioElement = document.getElementById( id + Sound.extension );
            if ( audioElement )
            {
                if ( audioElement.currentTime > 0 )
                {                
                    audioElement.play();
                }
            }
        }
    }
