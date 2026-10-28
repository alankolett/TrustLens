"""Unit tests for the Conservative Verdict Combiner."""
import pytest
from backend.models import RuleResult, RuleFlag, GrokVerdict
from backend.combiner import combine_verdicts

def test_both_red_yields_red():
    rule = RuleResult(
        score=75,
        suggested_verdict="red",
        flags=[RuleFlag(id="f1", category="authority", weight=45, title="CBI Threat", description="Desc")]
    )
    grok = GrokVerdict(verdict="red", confidence=90, reasons=["Police impersonation"], advice="Do not call")
    combined = combine_verdicts(rule, grok, language="en")
    assert combined.verdict == "red"
    assert combined.confidence >= 80

def test_either_red_yields_at_least_amber():
    # Rule says red, Grok says green
    rule = RuleResult(
        score=55,
        suggested_verdict="red",
        flags=[RuleFlag(id="f1", category="authority", weight=45, title="Digital arrest", description="Desc")]
    )
    grok = GrokVerdict(verdict="green", confidence=50, reasons=["Seems friendly"], advice="Stay safe")
    combined = combine_verdicts(rule, grok, language="en")
    assert combined.verdict in ("amber", "red")
    assert combined.verdict != "green"

def test_both_green_yields_green():
    rule = RuleResult(score=0, suggested_verdict="green", flags=[])
    grok = GrokVerdict(verdict="green", confidence=90, reasons=["Family message"], advice="Safe")
    combined = combine_verdicts(rule, grok, language="en")
    assert combined.verdict == "green"

def test_fallback_when_grok_fails():
    rule = RuleResult(
        score=60,
        suggested_verdict="red",
        flags=[RuleFlag(id="f1", category="url", weight=35, title="Phishing Link", description="Fake SBI domain")]
    )
    combined = combine_verdicts(rule, grok_res=None, language="mr")
    assert combined.analysis_mode == "rules_only"
    assert combined.verdict == "red"
    assert "ट्रस्टलेन्स हे सहाय्यक साधन आहे" in combined.disclaimer
    assert len(combined.reasons) > 0
