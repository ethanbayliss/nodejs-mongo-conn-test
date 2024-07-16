
kubectl debug -it -n apps --env MONGODB_URI="$MONGODB_URI" portal-mock-c6f678d68-qhsks \
  --image=ethanbayliss/mongoconn:1721123388
