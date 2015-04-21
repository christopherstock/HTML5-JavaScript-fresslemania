
    import  java.awt.*;
    import  java.awt.image.*;
    import  java.io.*;
    import  java.util.*;
    import  javax.imageio.*;

    /*********************************************************************************
    *   A tool that composes several bitmap frames to one single image.
    *********************************************************************************/
    public class SpriteComposer
    {
        public      static  final   String      VERSION             = "0.1";

        public      static          File        pathIn              = null;

        public static final void main( String[] args ) throws Exception
        {
            SpriteComposer sc = new SpriteComposer();
            sc.start();
        }

        public final void start() throws Exception
        {
            log( "SpriteComposer, v. [" + VERSION + "]" );
            Utils.setLookAndFeel();

            log( "Pick input dir" );
            pathIn  = Utils.getDir( null, "Select INPUT  directory" );

            //get all source-filenames
            File[]       filesInAll = pathIn.listFiles();
            Vector<File> filesInVec = new Vector<File>( Arrays.asList( filesInAll ) );
            for ( int i = filesInVec.size() - 1; i >= 0; --i )
            {
                //prune non-files
                if ( !filesInVec.elementAt( i ).isFile() ) filesInVec.removeElementAt( i );
            }
            File[]       filesIn    = filesInVec.toArray( new File[] {} );

            log( "found [" + filesIn.length + "] images" );

            //check if images are available
            if ( filesIn.length > 0 )
            {
                //choose desired framesX
                int framesX = Utils.getInt( "Please specify the desired count of\nhorizontal frames in the sprite:", "Choose frames X" );
                log( "desired are [" + framesX + "] horizontal frames" );

                //pick all buffered images
                BufferedImage[] frames = new BufferedImage[ filesIn.length ];
                for ( int i = 0; i < frames.length; ++i ) frames[ i ] = ImageIO.read( new FileInputStream( filesIn[ i ] ) );

                //create target image
                BufferedImage targetImage = createSprite( frames, framesX );

                //save target image
                File outputfile = new File( pathIn, "sprite.png" );
                ImageIO.write( targetImage, "png", outputfile );
                log( "File successfully saved under [" + outputfile.getCanonicalPath() + "]" );
            }
            else
            {
                //no source images
                log( "No files could be found in [" + pathIn.getCanonicalPath() + "]" );
            }
        }

        public static final BufferedImage createSprite( BufferedImage[] frames, int framesX )
        {
            int frameWidth   = frames[ 0 ].getWidth();
            int frameHeight  = frames[ 0 ].getHeight();
            log( "frame width is [" + frameWidth + "] frame height is [" + frameHeight + "]" );

            int framesY      = ( frames.length / framesX ) + ( frames.length % framesX );
            log( "desired are [" + framesY + "] vertical frames" );

            int spriteWidth  = framesX * frameWidth;
            int spriteHeight = framesY * frameHeight;

            log( "sprite width is [" + spriteWidth + "] sprite height is [" + spriteHeight + "]" );

            //create dynamic buffered image and draw context
            BufferedImage   sprite = new BufferedImage( spriteWidth, spriteHeight, BufferedImage.TYPE_INT_ARGB );
            Graphics2D      g2 = (Graphics2D)sprite.getGraphics();

            //draw all frames into the sprite
            int currentFrame = 0;
            out:
            for ( int frameY = 0; frameY < framesY; ++frameY )
            {
                for ( int frameX = 0; frameX < framesX; ++frameX )
                {
                    g2.drawImage( frames[ currentFrame ], frameX * frameWidth, frameY * frameHeight, null );
                    ++currentFrame;
                    if ( currentFrame >= frames.length ) break out;
                }
            }

            //convert to and return as GLImage
            return sprite;
        }

        public static final void log( Object msg )
        {
            System.out.println( msg.toString() );
        }
    }
