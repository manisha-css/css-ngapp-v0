# This is a helper routine to check if html files are in proper format. As html-beautify does not have check task,
# we use below script to check it
# Steps 
# 1) create temp dir 
# 2) Copy files coming as argument 
# 3) Apply html-beautify and see if any file has been changed 
# 4) If yes then echo message and return 1 
# 5) Finally clean up temp dir
# On mac if 'realpath' is not found then please install coreutils (brew install coreutils)  
#!/bin/bash
APPDIR=$(realpath $(dirname $(dirname $0)))
TMPDIR=$(mktemp -d)
cd $APPDIR
echo $APPDIR
for line in $*; do
  filepath=$(realpath $line)
  file=${filepath/$APPDIR\//}
  mkdir -p $TMPDIR/$(dirname $file)
  cp $APPDIR/$file $TMPDIR/$file
done

message=$(find $TMPDIR -type f | xargs node_modules/.bin/html-beautify -r | grep -v unchanged || true)
if [[ $message ]]; then
  echo "$message" | sed "s#$TMPDIR##g" | sed "s#\.\.\/##g"
  rm -rf $TMPDIR
  exit 1
fi

rm -rf $TMPDIR