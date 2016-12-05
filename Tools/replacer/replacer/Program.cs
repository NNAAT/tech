using System;
using System.IO;
using System.Text;
using System.Diagnostics;

namespace replacer
{
    class Program
    {
        public Stopwatch timer { get; set; }
        public string wrong { get; set; }
        public string right { get; set; }
        public string filePath { get; set; }
        public string fileName
        {
            get
            {
                return Path.GetFileName(this.filePath);
            }
        }
        public string tempFilePath { get; set; }
        public string tempFileName
        {
            get
            {
                return Path.GetFileName(this.tempFilePath);
            }
        }
        public StringBuilder buffer { get; set; }

        // 250 MegaBytes
        public static long chunkSize = 250 * 1024 * 1024;

        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;

            try
            {
                Stopwatch watch = Stopwatch.StartNew();

                if (args.Length != 3)
                {
                    throw new ArgumentException("Pass three parameters per run: [filename] [xxx]"
                        + "[yyy], where xxx is a string to be replaced with yyy");
                }

                Program ob = new Program();
                ob.timer = watch;

                string filePath = ob.filePath = args[0];
                string fileName = Path.GetFileNameWithoutExtension(filePath);
                ob.tempFilePath = Path.GetDirectoryName(filePath) + "\\" + fileName + "~";

                ob.wrong = args[1].Trim('"').Replace("`r`n", "\r\n");
                ob.right = args[2].Trim('"').Replace("`r`n", "\r\n");

                ob.RunReplace();
            }
            catch(Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
        }

        void RunReplace()
        {
            FileInfo fi = new FileInfo(this.filePath);

            bool split = false;
            bool fixxed = false;


            // If file is more than 250 MB, process it in line-by-line manner
            if (fi.Length > chunkSize)
            {
                // Create new buffer
                this.buffer = new StringBuilder();

                // Create new file to flush content into
                File.Create(this.tempFilePath).Close();

                split = true;

                using (StreamReader sr = new StreamReader(this.filePath, Encoding.UTF8))
                {
                    long bufferSize = 0;
                    string line;

                    while ((line = sr.ReadLine()) != null)
                    {
                        this.buffer.AppendLine(line);
                        // +2 bytes for new lines
                        bufferSize += Encoding.UTF8.GetByteCount(line) + 2;

                        if (bufferSize > chunkSize)
                        {
                            this.ReplaceFlushToFile();
                            bufferSize = 0;
                        }
                    }

                    if (this.buffer.Length > 0)
                    {
                        this.ReplaceFlushToFile();
                    }
                }
            }
            else
            {
                string fileText = File.ReadAllText(this.filePath, Encoding.UTF8);

                if (fileText.Contains(this.wrong))
                {
                    fixxed = true;

                    // Create new file to flush content into
                    File.Create(this.tempFilePath).Close();

                    this.buffer = new StringBuilder(fileText);
                    this.ReplaceFlushToFile();
                }
            }

            if (fixxed || split)
            {
                // Remove the original file
                File.Delete(this.filePath);
                // Rename the new file
                File.Move(this.tempFilePath, Path.GetDirectoryName(this.tempFilePath) + "\\" + this.fileName);
            }

            this.timer.Stop();

            string message;

            if (split)
            {
                message = string.Format("{0} reviewed in line-by-line manner, took {1} second(s){2}",
                    this.fileName, this.timer.Elapsed.TotalSeconds, Environment.NewLine);
            }
            else
            {
                if (fixxed)
                {
                    message = string.Format("{0} successfuly fixed, took {1} second(s){2}",
                        this.fileName, this.timer.Elapsed.TotalSeconds, Environment.NewLine);
                }
                else
                {
                    message = string.Format("{0} did not require string replacements, skipping the file{1}",
                        this.fileName, Environment.NewLine);
                }
            }
                
            Console.WriteLine(message);
        }

        // Fix the buffer and append text to the existing file
        void ReplaceFlushToFile()
        {
            this.buffer.Replace(this.wrong, this.right);

            using (StreamWriter sw = new StreamWriter(File.Open(this.tempFilePath, FileMode.Append), Encoding.UTF8))
            {
                sw.Write(this.buffer);
            }

            // Reset buffer
            this.buffer.Clear();
            this.buffer = new StringBuilder();
            GC.Collect();
        }
    }
}