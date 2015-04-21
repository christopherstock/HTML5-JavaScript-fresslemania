/*  $Id: Drawing.js 31916 2011-08-04 09:34:43Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Offers drawing functionality for the canvas.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31916 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/ui/Drawing.js $
    *****************************************************************************/
    var     Drawing                         = new Object();
    {
        /*****************************************************************************
        *   Fills a rect with the specified dimensions and color.
        *
        *   @param  x       The left  coordinate.
        *   @param  y       The right coordinate.
        *   @param  scaleHeight   The desired width.
        *   @param  height  The desired height.
        *   @param  col     A fill color. 
        *****************************************************************************/    
        Drawing.fillRect = function( x, y, width, height, col )
        {
            Canvas.CONTEXT.fillStyle = col;
            Canvas.CONTEXT.fillRect( x, y, width, height );
        }

        /*****************************************************************************
        *   Fills all pixels of the canvas with the given fill color.
        *
        *   @param  col     A fill color. 
        *****************************************************************************/    
        Drawing.fillCanvas = function( col )
        {
            Canvas.CONTEXT.fillStyle = col;
            Canvas.CONTEXT.fillRect( 0, 0, Canvas.WIDTH, Canvas.HEIGHT );
        }

        /*****************************************************************************
        *   Draws an image with the number-sprite.
        *
        *   @param  str     The string to draw.
        *   @param  x       The string position x.
        *   @param  y       The string position y.
        *   @param  ank     The string anchor for drawing. 
        *****************************************************************************/    
        Drawing.drawBitmapString = function( str, x, y, ank )
        {
            var img         = Images.getImage( Images.PRELOADER_NUMBERS );
            var frameWidth  = img.width / 11; 
            var stringWidth = ( str.length * frameWidth )
            var drawX       = x;
            var drawY       = y;
            
            //translate for anchor
            switch( ank )
            {
                case Anchor.LEFT_TOP:       {   drawX -= 0;                   drawY -= 0;                         break;  }       
                case Anchor.CENTER_TOP:     {   drawX -= stringWidth / 2;     drawY -= 0;                         break;  }
                case Anchor.RIGHT_TOP:      {   drawX -= stringWidth;         drawY -= 0;                         break;  }
                case Anchor.LEFT_MIDDLE:    {   drawX -= 0;                   drawY -= img.height / 2;            break;  }
                case Anchor.CENTER_MIDDLE:  {   drawX -= stringWidth / 2;     drawY -= img.height / 2;            break;  }
                case Anchor.RIGHT_MIDDLE:   {   drawX -= stringWidth;         drawY -= img.height / 2;            break;  }
                case Anchor.LEFT_BOTTOM:    {   drawX -= 0;                   drawY -= img.height;                break;  }
                case Anchor.CENTER_BOTTOM:  {   drawX -= stringWidth / 2;     drawY -= img.height;                break;  }
                case Anchor.RIGHT_BOTTOM:   {   drawX -= stringWidth;         drawY -= img.height;                break;  }
            }
            
            //browse all chars
            for ( var i = 0; i < str.length; ++i )
            {
                switch ( str.charAt( i ) )
                {
                    case ' ':       frame = -1;                         break;
                    case '%':       frame = 10;                         break;
                    default:        frame = 0 + str.charAt( i );        break;
                }
                
                //draw frame if desired
                if ( frame == -1 ) 
                {
                    drawX += frameWidth / 2;
                }
                else
                {
                    Drawing.drawSprite( Images.getImage( Images.PRELOADER_NUMBERS ), drawX, y, Anchor.LEFT_TOP, 11, 1, frame );
                    drawX += frameWidth;
                }    
            }
        }

        Drawing.drawSpriteObj = function( sprite, x, y, ank, frame )
        {
            Drawing.drawSprite( sprite.img, x, y, ank, sprite.framesX, sprite.framesY, frame );        
        }
    
        /*****************************************************************************
        *   Draws an image at the specified location with a specified anchor.
        *
        *   @param  img     The image to draw.
        *   @param  x       Drawing position x.
        *   @param  y       Drawing position y.
        *   @param  ank     The anchor for this drawing operation.
        *****************************************************************************/    
        Drawing.drawSprite = function( img, x, y, ank, frameCountX, frameCountY, frame )
        {
            var frameWidth  = img.width  / frameCountX;
            var frameHeight = img.height / frameCountY;
            
            //alter x and y according to ank
            switch ( ank )
            {
                case Anchor.LEFT_TOP:       {   x -= 0;                  y -= 0;                         break;  }       
                case Anchor.CENTER_TOP:     {   x -= frameWidth / 2;     y -= 0;                         break;  }
                case Anchor.RIGHT_TOP:      {   x -= frameWidth;         y -= 0;                         break;  }
                case Anchor.LEFT_MIDDLE:    {   x -= 0;                  y -= img.height / 2;            break;  }
                case Anchor.CENTER_MIDDLE:  {   x -= frameWidth / 2;     y -= img.height / 2;            break;  }
                case Anchor.RIGHT_MIDDLE:   {   x -= frameWidth;         y -= img.height / 2;            break;  }
                case Anchor.LEFT_BOTTOM:    {   x -= 0;                  y -= img.height;                break;  }
                case Anchor.CENTER_BOTTOM:  {   x -= frameWidth / 2;     y -= img.height;                break;  }
                case Anchor.RIGHT_BOTTOM:   {   x -= frameWidth;         y -= img.height;                break;  }
            }
             
            //draw frame
            Drawing.drawImageScaledClipped( img, x, y, Anchor.LEFT_TOP, frameWidth * ( frame % frameCountX ), frameHeight * parseInt( frame / frameCountX ), frameWidth, frameHeight, frameWidth, frameHeight );
            
            //draw frame number
            //Drawing.drawTextOutlined( "[" + frame + "]", x, y, "#000000", "#ffffff", "20px Verdana", Anchor.LEFT_TOP );
        }    

        /*****************************************************************************
        *   Draws an image at the specified location with a specified anchor.
        *
        *   @param  img     The image to draw.
        *   @param  x       Drawing position x.
        *   @param  y       Drawing position y.
        *   @param  ank     The anchor for this drawing operation.
        *****************************************************************************/    
        Drawing.drawImage = function( img, x, y, ank )
        {
            Drawing.drawImageScaledClipped( img, x, y, ank, 0, 0, img.width, img.height, img.width, img.height );
        }
        
        /*****************************************************************************
        *   Draws an image at the specified location with a specified anchor
        *   and scales it to the given destiny dimensions.
        *
        *   @param  img         The image to draw.
        *   @param  x           Drawing position x.
        *   @param  y           Drawing position y.
        *   @param  ank         The anchor for this drawing operation.
        *****************************************************************************/    
        Drawing.drawImageScaledClipped = function( img, x, y, ank, clipX, clipY, clipWidth, clipHeight, scaleWidth, scaleHeight )
        {
            //alter x and y according to ank
            switch ( ank )
            {
                case Anchor.LEFT_TOP:       {   x -= 0;                 y -= 0;                         break;  }       
                case Anchor.CENTER_TOP:     {   x -= img.width / 2;     y -= 0;                         break;  }
                case Anchor.RIGHT_TOP:      {   x -= img.width;         y -= 0;                         break;  }
                case Anchor.LEFT_MIDDLE:    {   x -= 0;                 y -= img.height / 2;            break;  }
                case Anchor.CENTER_MIDDLE:  {   x -= img.width / 2;     y -= img.height / 2;            break;  }
                case Anchor.RIGHT_MIDDLE:   {   x -= img.width;         y -= img.height / 2;            break;  }
                case Anchor.LEFT_BOTTOM:    {   x -= 0;                 y -= img.height;                break;  }
                case Anchor.CENTER_BOTTOM:  {   x -= img.width / 2;     y -= img.height;                break;  }
                case Anchor.RIGHT_BOTTOM:   {   x -= img.width;         y -= img.height;                break;  }
            }
         
            //draw with src and dst rect
            Canvas.CONTEXT.drawImage( img, clipX, clipY, clipWidth, clipHeight, x, y, scaleWidth, scaleHeight );
        }

        Drawing.drawText = function( text, x, y, col, fnt, ank )
        {
            Drawing.privateDrawText( text, x, y, col, -1, -1, fnt, ank );
        }
        
        Drawing.drawTextShaded = function( text, x, y, colText, colShadow, fnt, ank )
        {
            Drawing.privateDrawText( text, x, y, colText, colShadow, -1, fnt, ank );
        }
        
        Drawing.drawTextOutlined = function( text, x, y, colText, colOutline, fnt, ank )
        {
            Drawing.privateDrawText( text, x, y, colText, -1, colOutline, fnt, ank );
        }

        Drawing.privateDrawText = function( text, x, y, colText, colShadow, colOutline, fnt, ank )
        {
            //set anchor
            switch ( ank )
            {
                case Anchor.LEFT_TOP:       { Canvas.CONTEXT.textAlign="left";   Canvas.CONTEXT.textBaseline = "top";      break;  }       
                case Anchor.CENTER_TOP:     { Canvas.CONTEXT.textAlign="center"; Canvas.CONTEXT.textBaseline = "top";      break;  }
                case Anchor.RIGHT_TOP:      { Canvas.CONTEXT.textAlign="right";  Canvas.CONTEXT.textBaseline = "top";      break;  }
                case Anchor.LEFT_MIDDLE:    { Canvas.CONTEXT.textAlign="left";   Canvas.CONTEXT.textBaseline = "middle";   break;  }
                case Anchor.CENTER_MIDDLE:  { Canvas.CONTEXT.textAlign="center"; Canvas.CONTEXT.textBaseline = "middle";   break;  }
                case Anchor.RIGHT_MIDDLE:   { Canvas.CONTEXT.textAlign="right";  Canvas.CONTEXT.textBaseline = "middle";   break;  }
                case Anchor.LEFT_BOTTOM:    { Canvas.CONTEXT.textAlign="left";   Canvas.CONTEXT.textBaseline = "bottom";   break;  }
                case Anchor.CENTER_BOTTOM:  { Canvas.CONTEXT.textAlign="center"; Canvas.CONTEXT.textBaseline = "bottom";   break;  }
                case Anchor.RIGHT_BOTTOM:   { Canvas.CONTEXT.textAlign="right";  Canvas.CONTEXT.textBaseline = "bottom";   break;  }                                
            }
            
            //set font
            Canvas.CONTEXT.font = fnt;
            
            //draw shadow if desired
            if ( colShadow != -1 )
            {
                Canvas.CONTEXT.fillStyle = colShadow;
                Canvas.CONTEXT.fillText( text, x + 1, y + 1 );
            }
            
            //draw outline if desired
            if ( colOutline != -1 )
            {
                Canvas.CONTEXT.fillStyle = colOutline;
                Canvas.CONTEXT.fillText( text, x - 1, y - 1 );
                Canvas.CONTEXT.fillText( text, x - 1, y + 0 );
                Canvas.CONTEXT.fillText( text, x - 1, y + 1 );
                Canvas.CONTEXT.fillText( text, x + 0, y - 1 );
                Canvas.CONTEXT.fillText( text, x + 0, y + 1 );
                Canvas.CONTEXT.fillText( text, x + 1, y - 1 );
                Canvas.CONTEXT.fillText( text, x + 1, y + 0 );
                Canvas.CONTEXT.fillText( text, x + 1, y + 1 );
            }
            
            //draw fg
            Canvas.CONTEXT.fillStyle = colText;
            Canvas.CONTEXT.fillText( text, x, y );
        }
    }
