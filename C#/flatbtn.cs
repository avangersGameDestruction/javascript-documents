public class CustomButton : Button
{
    public CustomButton()
        : base()
    {
        // Prevent the button from drawing its own border
        FlatAppearance.BorderSize = 0;
        FlatStyle = System.Windows.Forms.FlatStyle.Flat;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);

        // Draw Border using color specified in Flat Appearance
        Pen pen = new Pen(FlatAppearance.BorderColor, 1);
        Rectangle rectangle = new Rectangle(0, 0, Size.Width - 1, Size.Height - 1);
        e.Graphics.DrawRectangle(pen, rectangle);
    }
}