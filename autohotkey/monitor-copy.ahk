#Persistent
OnClipboardChange("ClipChanged")
SetTimer, ShowToolTip, 500
return

ShowToolTip:
ToolTip, OJO! Estoy procesando el portapapeles first_word_per_line hombre
return

ClipChanged(Type) {
    if (Type==1) {
        Run, php f:/www/utils/nombres-db/php/input_clipboard.php --algo first_word_per_line --sexo=hombre
    }
}