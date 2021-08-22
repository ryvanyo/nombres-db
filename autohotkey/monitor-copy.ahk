#Persistent
OnClipboardChange("ClipChanged")
return

ClipChanged(Type) {
    if (Type==1) {
        Run, php f:/www/utils/nombres-db/php/input_clipboard.php --algo first_word_per_line --sexo=mujer
        ; FormatTime, CurTime, ,yyyyMMddHHmmss
        ; MsgBox %CurTime%.txt

        ; ToolTip, Clipboard data type: %Type% : %clipboard%
        ; Sleep 2000

        ; ToolTip  ; Turn off the tip.
        ; FileAppend, [ Text, Filename]
    }
}