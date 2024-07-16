time="$(date +%s)"


docker build . -t ethanbayliss/mongoconn:$time

docker push ethanbayliss/mongoconn:$time
