import os
import json


images = os.listdir("data/photos")
images.remove("meta.json")

with open("data/photos/meta.json", "w") as f:
    json.dump(images, f)

print("Image Meta Filled")
