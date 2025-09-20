import unittest
from backend.parser import parse_log_line

class TestParser(unittest.TestCase):

    def test_parse_ssh_success(self):
        log_line = "Jan 10 12:34:56 server sshd[1234]: Accepted password for user from 192.168.1.10 port 5555 ssh2"
        result = parse_log_line(log_line)
        self.assertEqual(result["event"], "login_success")
        self.assertEqual(result["user"], "user")
        self.assertEqual(result["src_ip"], "192.168.1.10")

    def test_parse_ssh_failure(self):
        log_line = "Jan 10 12:34:56 server sshd[1234]: Failed password for root from 10.0.0.5 port 4444 ssh2"
        result = parse_log_line(log_line)
        self.assertEqual(result["event"], "login_failure")
        self.assertEqual(result["user"], "root")
        self.assertEqual(result["src_ip"], "10.0.0.5")

    def test_parse_unrecognized(self):
        log_line = "This is a random log"
        result = parse_log_line(log_line)
        self.assertEqual(result["event"], "unrecognized")

if __name__ == '__main__':
    unittest.main()
