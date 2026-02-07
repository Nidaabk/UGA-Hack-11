import realtime
import cv2
import torch
from torch import load
from model import DETR
import albumentations as A
from utils.boxes import rescale_bboxes
from utils.setup import get_classes, get_colors
from utils.logger import get_logger
from utils.rich_handlers import DetectionHandler, create_detection_live_display
import sys
import time 

from collections import Counter


# Initialize logger and handlers
def start_recording():
    logger = get_logger("realtime")
    detection_handler = DetectionHandler()

    logger.print_banner()
    logger.realtime("Initializing real-time sign language detection...")

    transforms = A.Compose(
            [   
                A.Resize(224,224),
                A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
                A.ToTensorV2()
            ]
        )

    model = DETR(num_classes=3)
    model.eval()
    model.load_pretrained('checkpoints/99_model.pt')
    CLASSES = get_classes() 
    COLORS = get_colors() 

    logger.realtime("Starting camera capture...")
    cap = cv2.VideoCapture(0)

    # Initialize performance tracking
    frame_count = 0
    fps_start_time = time.time()

    common_list = []
    last_used = ""

    while cap.isOpened():
        m = realtime.record_info(cap, logger, transforms, model, CLASSES, frame_count, fps_start_time, detection_handler, COLORS)
        if m == "error":
            break

        if len(common_list)<10:
            common_list.append(m)
        else:
            #finding most common message out of the 10 collected messages
            common_message = Counter(common_list).most_common(1)[0][0]
            common_list = []

            if common_message == last_used: continue
            last_used = common_message
            if common_message == "": continue
            print(common_message)



    cap.release() 
    cv2.destroyAllWindows() 


if __name__ == "__main__":
    user = input("press y to start recording")
    if user=="y":
        start_recording()
        print("done")