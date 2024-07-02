import base64
import hashlib
import hmac
key = "$ecretKey123456"
device_id = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
timezone = "Europe/Paris"
unixts = "1707480228"

data = device_id + timezone + unixts
data_bytes = data.encode("utf-8")

base64_bytes = base64.b64encode(data_bytes)
base64_string = base64_bytes.decode("utf-8")

signature = hmac.new(
    bytes(key, 'utf-8'),
    msg=bytes(base64_string, 'utf-8'),
    digestmod=hashlib.sha256
)


s2 = b"1:" + unixts.encode("utf-8") + b":" + signature.digest()

s3 = base64.b64encode(s2)
print("bereal-timezone:", timezone)
print("bereal-device-id:", device_id)
print("bereal-signature:", s3.decode("utf-8"))