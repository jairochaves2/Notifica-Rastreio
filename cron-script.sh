#! /bin/zsh
echo "Hello World";
echo "lalala";
export $(cat .env | xargs);
nvm use 18;
node ./src/index.js;
# exibir a pasta atual com pwd
echo $(node -v);