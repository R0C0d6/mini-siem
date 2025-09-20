import unittest
from backend.alerts import check_for_alerts

class TestAlerts(unittest.TestCase):

    def test_bruteforce_alert(self):
        logs = [
            {"event": "login_failure", "src_ip": "1.2.3.4"} for _ in range(6)
        ]
        alerts = check_for_alerts(logs)
        self.assertTrue(any("brute-force" in a["message"] for a in alerts))

    def test_no_alerts_for_normal_activity(self):
        logs = [
            {"event": "login_success", "src_ip": "1.2.3.4"}
        ]
        alerts = check_for_alerts(logs)
        self.assertEqual(len(alerts), 0)

    def test_multiple_sources(self):
        logs = [
            {"event": "login_failure", "src_ip": "1.2.3.4"},
            {"event": "login_failure", "src_ip": "5.6.7.8"},
        ]
        alerts = check_for_alerts(logs)
        self.assertEqual(len(alerts), 0)  # not enough failures yet

if __name__ == '__main__':
    unittest.main()
