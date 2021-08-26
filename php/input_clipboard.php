<?php
function getClipboard():string{
    if(PHP_OS_FAMILY==="Windows"){
    // works on windows 7 + (PowerShell v2 + )
    // TODO: is it -1 or -2 bytes? i think it was -2 on win7 and -1 on win10?
        return substr(shell_exec('powershell -sta "add-type -as System.Windows.Forms; [windows.forms.clipboard]::GetText()"'),0,-1);
    }elseif(PHP_OS_FAMILY==="Linux"){
        // untested! but should work on X.org-based linux GUI's
        return substr(shell_exec('xclip -out -selection primary'),0,-1);
    }elseif(PHP_OS_FAMILY==="Darwin"){
        // untested! 
        return substr(shell_exec('pbpaste'),0,-1);
    }else{
        throw new \Exception("running on unsupported OS: ".PHP_OS_FAMILY." - only Windows, Linux, and MacOS supported.");
    }
}

$opt = getopt('', ['algo:', 'sexo:']);

if (empty($opt['algo'])) {
    echo "\nSe necesita el parametro --algo [algoritmo]\n";
    echo "Posibles algoritmos a usar:\n";
    echo "first_word_per_line\n    Se guardará la primera palabra por cada linea.\n    Necesita el parametro --sexo [hombre|mujer] que se asignara a todos los nombres guardados.";
    exit();
}

$content = getClipboard();

if (empty($content)) {
    echo "\nNo hay nada en el clipboard.\n";
    exit();
}

$sexos = ['hombre'=>1, 'mujer'=>1];

switch($opt['algo']){
    case 'first_word_per_line':
        if (empty($opt['sexo']) || !isset($sexos[ $opt['sexo'] ])) {
            echo "\nNecesita el parametro --sexo [hombre|mujer] que se asignara a todos los nombres guardados.\n";
            exit();
        }
        $sexo = $opt['sexo'];
        $lines = explode("\n", $content);
        require_once __DIR__."/db.php";

        foreach($lines as $line){
            $words = explode(" ", trim($line));
            $nombre = reset($words);
            $insertado = insert($nombre, $sexo);
            if ($insertado) {
                echo $nombre."\n";
            } else {
                echo "\t\t\t".$nombre." !\n";
            }
        }
        
        // exec("pause");
        break;
}