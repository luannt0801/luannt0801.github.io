You are asked to set up a simple cloud-based video transcoder using free open-source software. A recommended alternative is that you can use a combination of free-tier cloud services and open-source tools like **FFmpeg**. The key here is to use a free-tier cloud instance, which has limited resources but is sufficient for small tasks such as transcoding videos.

This guide will walk you through setting up a transcoder using FFmpeg on a free Google Cloud instance.

### Step 1: Set Up Google Cloud Free Tier Instance

1. **Sign Up for Google Cloud**:
    
    - Visit [Google Cloud](https://cloud.google.com/) and sign in or sign up for a new account.
    - If it's your first time using Google Cloud, you can get a **$300 free credit** to use for the first 90 days. But for the purpose of this setup, we will stick to the **Always Free** tier.
2. **Create a Virtual Machine (VM)**:
    
    - Once logged in, go to the **Google Cloud Console**.
    - In the left navigation, go to **Compute Engine > VM Instances**.
    - Click on **Create Instance** to create a new virtual machine.
3. **Configure the VM**:
    
    - Choose **Region**: Select any region eligible for the free tier (e.g., us-west1).
    - Choose **Machine type**: Select f1-micro (this is free under the Always Free tier, with limitations).
    - For **Boot Disk**, choose **Ubuntu 22.04 LTS** (this is a lightweight, well-supported Linux distribution).
    - Under **Firewall**, check both options: **Allow HTTP traffic** and **Allow HTTPS traffic** (you may need these for later, but they are not required for transcoding).
4. **Create the VM**:
    
    - Once your settings are configured, click on **Create**. This will launch your instance.
5. **Access the VM**:
    
    - After the instance is created, you'll see an **external IP** under the VM instance details.
    - Open your terminal (or use an SSH client like PuTTY if you’re on Windows), and connect to your instance via SSH:
        
        gcloud compute ssh --zone us-west1-a instance-name
        
        (Replace instance-name with the name of your VM instance.)

Step 2: Install FFmpeg on Your Cloud Instance

1. **Update your VM’s package list**:
    
    sudo apt update
    
2. **Install FFmpeg**: FFmpeg is available in Ubuntu’s default package repositories, so you can install it directly:
    
    sudo apt install ffmpeg -y
    
3. **Verify FFmpeg Installation**: After installation, verify that FFmpeg is working by checking its version:
    
    ffmpeg -version
    
    You should see output confirming the FFmpeg version and configuration.
    

Step 3: Set Up a Simple Video Transcoding Script

To make the transcoding process easier, let’s create a simple script that uses FFmpeg to convert video files.

1. **Create a Transcoding Script**:
    
    - Create a new file using nano:
        
        nano transcoder.sh
        
    - Add the following code to the script:
        
          
        
        #!/bin/bash # Simple video transcoder to convert any video to MP4 format INPUT=$1 OUTPUT=$2 ffmpeg -i "$INPUT" -vcodec libx264 -acodec aac -strict -2 "$OUTPUT"
        
    - Save the file and exit by pressing CTRL + X, then Y to confirm, and ENTER to save.
        
2. **Make the script executable**:
    
    chmod +x transcoder.sh
    
3. **Run the Script**: To transcode a video file, you would run the following command, passing the input video file and desired output file:
    
    ./transcoder.sh input_video.avi output_video.mp4
    

Step 4: Upload Files to Your VM and Trigger Transcoding (Using SFTP)

If you want to upload videos to the VM for transcoding, you can use **SFTP** to transfer files to your VM.

1. **Install and Configure SFTP**:
    
    - Ensure that you have **SSH access** enabled on your VM (which should be the case by default).
    - Use an SFTP client (like **FileZilla** or **Cyberduck**) to upload files to your VM using the **external IP** and your SSH credentials.
2. **Use SFTP to Upload Files**:
    
    - Once the SFTP client is connected, upload the videos you want to transcode to a directory on your VM (e.g., /home/username/videos/).
3. **Trigger Transcoding**:
    
    - After uploading the file, SSH into your VM and run the transcoding script:
        
          
        
        ./transcoder.sh /home/username/videos/input_video.mkv /home/username/videos/output_video.mp4
        

Turn in a screen-recorded video clip that demonstrates what you have done and outcomes.