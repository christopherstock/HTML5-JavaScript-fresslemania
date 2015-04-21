
    import  java.io.*;
    import  javax.swing.*;

    /*********************************************************************************
    *   Containing additional functionality.
    *********************************************************************************/
    public class Utils
    {
        /*******************************************************************************************************
        *   A default-dialog for a directory.
        *
        *   @param  initPath        The path to start browsing - The current working directory is used if <code>null</code>.
        *   @param  parentFrame     The parent frame that shall be disabled until the folder is picked.
        *   @param  title           The dialog's title.
        *   @return                 The selected directory.
        ********************************************************************************************************/
        public static final File getDir( String initPath, String title )
        {
            JFileChooser fc = new JFileChooser( ( initPath == null ? new File( "" ).getAbsolutePath() : initPath ) );
            fc.setFileSelectionMode( JFileChooser.DIRECTORIES_ONLY );
            fc.setDialogTitle( title );
            if ( fc.showDialog( null, "Open directory" ) == JFileChooser.APPROVE_OPTION )
            {
                return fc.getSelectedFile();
            }

            return null;
        }

        /*******************************************************************************************************
        *   A default dialog for inserting an integer. The dialog will be shown repeatedly until the user
        *   inputs a valid integer or until 'CANCEL' is pressed. This dialog is only suitable for expected
        *   values higher or equal 0.
        *
        *   @param  textBody    Text for the dialog's body.
        *   @param  textTitle   Text for the dialog's title.
        *   @return             The inserted integer or -1 if CANCEL was pressed.
        ********************************************************************************************************/
        public static final int getInt( String textBody, String textTitle )
        {
            do
            {
                try
                {
                    String input = JOptionPane.showInputDialog( null, textBody, textTitle, JOptionPane.QUESTION_MESSAGE );

                    //check if abort has been pressed
                    if ( input == null )
                    {
                        return -1;
                    }

                    return Integer.parseInt( input );
                }
                catch ( NumberFormatException nfe ) {}
            }
            while ( true );
        }

        /*******************************************************************************************************
        *   Sets the look-and-feel of the host-operating-system.
        ********************************************************************************************************/
        public static final void setLookAndFeel()
        {
            try
            {
                UIManager.setLookAndFeel( UIManager.getSystemLookAndFeelClassName() );
            }
            catch( Exception e )
            {
            }
        }
    }
