/*  $Id: Game.js 31878 2011-08-04 07:31:07Z schristopher $
 *  ============================================================================
 */

    /*****************************************************************************
    *   Builds the gamestate.
    *
    *   @author     $Author: schristopher $
    *   @version    $Rev: 31878 $
    *   @link       $URL: http://svn.synapsy.net/svn/Synapsy/odp/client/html5/Fresslemania/src/state/Game.js $
    *****************************************************************************/
    var     Game                            = new Object();
    { 
        Game.GAME_STATE_ACCLAIM             = 0;
        Game.GAME_STATE_RUNNING             = 1;
        Game.GAME_STATE_PAUSE               = 2;
        Game.GAME_STATE_OVER                = 3;
    
        Game.gameState                      = Game.GAME_STATE_ACCLAIM;
        
        Game.initNewGame = function()
        {
            Game.gameState      = Game.GAME_STATE_ACCLAIM;
            
            //init HUD
            HUD.init();
        
            //reset blocks
            Level.initLevel();
            
            //start bg sound
            //soundBg1.play();
        }
        
        Game.tickGame = function()
        {
            //animate according to game state
            switch ( Game.gameState )
            {
                case Game.GAME_STATE_ACCLAIM:
                case Game.GAME_STATE_PAUSE:
                {
                    //animate nothing!
                    break;
                }
            
                case Game.GAME_STATE_RUNNING:
                {
                    //handle player jumping / falling
                    Level.current.player.handleY();            
                
                    //check items collision with player
                    Item.checkCollisionAll( Level.current.items, Level.current.player.block.rect );
                
                    //animate items
                    Item.animateAll( Level.current.items );
                    
                    //animate enemies
                    Enemy.animateEnemies( Level.current.enemies );

                    //animate player
                    Level.current.player.block.animateBlock();

                    //animate HUD
                    HUD.animate();
                    
                    break;
                }
                
                case Game.GAME_STATE_OVER:
                {
                    break;
                }
            }
        }
        
        Game.handleKeys = function()
        {
            //animate according to game state
            switch ( Game.gameState )
            {
                case Game.GAME_STATE_ACCLAIM:
                {
                    //start game if desired
                    if ( Key.KEY_ENTER.hold || Main.SKIP_LEVEL_ACCLAIM )
                    {
                        Key.KEY_ENTER.ignoreTillNextRelease();
                        
                        //run game and play bg
                        Game.gameState = Game.GAME_STATE_RUNNING;
                        Sound.playSound( Sound.SOUND_BG_1 );
                        
                    }
                    else if ( Key.KEY_ESCAPE.hold )
                    {
                        Key.KEY_ESCAPE.ignoreTillNextRelease();
                        
                        //run game and play bg
                        Game.gameState = Game.GAME_STATE_RUNNING;
                        Sound.playSound( Sound.SOUND_BG_1 );
                    }
                    break;
                }
            
                case Game.GAME_STATE_RUNNING:
                {
                    //handle player's keys
                    Level.current.player.handlePlayerKeys()
                    
                    //switch to pause if desired
                    if ( Key.KEY_ESCAPE.hold )
                    {
                        Key.KEY_ESCAPE.ignoreTillNextRelease();
                        Game.gameState = Game.GAME_STATE_PAUSE;
                        Sound.pauseSound( "bg1" );
                    }
                    break;
                }
                
                case Game.GAME_STATE_PAUSE:
                {
                    //switch back to game if desired
                    if ( Key.KEY_ESCAPE.hold )
                    {
                        Key.KEY_ESCAPE.ignoreTillNextRelease();
                        Game.gameState = Game.GAME_STATE_RUNNING;
                        Sound.resumeSound( "bg1" );
                    }
                    
                    if ( Key.KEY_ENTER.hold )
                    {
                        Key.KEY_ENTER.ignoreTillNextRelease();
                        Action.enqueueAction( Action.ACTION_CHANGE_TO_MAIN_MENU );
                    }
                    break;
                }
                
                case Game.GAME_STATE_OVER:
                {
                    break;
                }
            }
        }
    
        Game.drawGame = function()
        {
            //animate according to game state
            switch ( Game.gameState )
            {
                case Game.GAME_STATE_ACCLAIM:
                {
                    //draw gamescreen
                    Game.drawGameScreen();                   

                    //draw HUD
                    HUD.drawHUD();
                    
                    //draw level caption
                    Drawing.drawImage( Images.getImage( Images.GAME_LEVEL_1         ), Canvas.WIDTH / 2, Canvas.HEIGHT / 4, Anchor.CENTER_MIDDLE );
                    Drawing.drawImage( Images.getImage( Images.GAME_LEVEL_1_CAPTION ), Canvas.WIDTH / 2, Canvas.HEIGHT / 4 + Images.getImage( Images.GAME_LEVEL_1 ).height / 2, Anchor.CENTER_MIDDLE );
                    Drawing.drawImage( Images.getImage( Images.GAME_HELP            ), Canvas.WIDTH / 2, 30, Anchor.CENTER_TOP );
                    
                    break;
                }        
            
                case Game.GAME_STATE_RUNNING:
                {
                    //draw gamescreen
                    Game.drawGameScreen();
                    
                    //draw HUD
                    HUD.drawHUD();

                    break;
                }
                
                case Game.GAME_STATE_PAUSE:
                {
                    //draw gamescreen
                    Game.drawGameScreen();                 

                    //draw HUD
                    HUD.drawHUD();
                
                    //draw black overlay
                    //Drawing.fillCanvas( "rgba( 0, 0, 0, 0.2 )" );
                                
                    //draw 'pawsed' and help
                    Drawing.drawImage( Images.getImage( Images.GAME_PAWSED ),           Canvas.WIDTH / 2, Canvas.HEIGHT / 4, Anchor.CENTER_MIDDLE );
                    Drawing.drawImage( Images.getImage( Images.GAME_PAWSE_HELP ),       Canvas.WIDTH / 2, 30, Anchor.CENTER_TOP );
                    
                    break;
                }
                
                case Game.GAME_STATE_OVER:
                {
                    break;
                }
            }
        }
        
        Game.drawGameScreen = function() 
        {
            //update camera
            var camera = Camera.getCurrent();
            
            //clear screen 
            Drawing.fillCanvas( "rgb( 0, 0, 0 )" );
        
            //draw bg
            Level.current.drawLevelBg( camera );
        
            //draw level
            Level.current.drawLevelFg( camera );
            
            //draw items
            Item.drawAll( Level.current.items, camera );
            
            //draw all enemies
            for ( var i = 0; i < Level.current.enemies.length; ++i )
            {
                if ( !Level.current.enemies[ i ].dead ) Level.current.enemies[ i ].block.drawBlock( camera );    
            }
            
            //draw player
            Level.current.player.block.drawBlock( camera );
            
            //draw bg overlay
            HUD.drawBgOverlay();
        }
    }
