

function try()
{
    [[ $- = *e* ]]; SAVED_OPT_E=$?
    set +e
}

function throw()
{
    exit $1
}

function catch()
{
    export ex_code=$?
    (( $SAVED_OPT_E )) && set +e
    return $ex_code
}

function throwErrors()
{
    set -e
}

function ignoreErrors()
{
    set +e
}

export AnException=100
export AnotherException=101

GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'

echo "run the operation ************"
echo "\$1 version will change to \$2 version"

read -p ":" line
from=`echo "$line" | cut -f1 -d' '`
target=`echo "$line" | cut -f2 -d' '`

echo $from 
echo $target

function upload() {
    try
    (
        aws s3 sync s3://booking-app.stayjanda.cloud/$1 s3://booking-app.stayjanda.cloud/$2 --acl public-read
        echo -e "version ${GREEN}$from${NC} move to ${GREEN}$target${NC}"
    )
    catch || {
        echo -e "${RED}Fail${NC}" 
    }
}
 


if [ "$from" == "stable" ]
then
    upload "$from" ""
elif [ "$target" == "stable" ]
then
    upload "" "$target"
else
    upload "$from" "$target"
fi
