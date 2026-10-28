"""Pydantic data models for TrustLens request/response payloads."""
from typing import List, Optional, Literal
from pydantic import BaseModel, Field

VerdictLevel = Literal["red", "amber", "green"]

class TextCheckRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=10000, description="Message text or URL to evaluate")
    language: str = Field("en", description="Target language for explanation: 'en', 'mr', or 'hi'")

class RuleFlag(BaseModel):
    id: str
    category: str
    weight: int
    title: str
    description: str

class RuleResult(BaseModel):
    score: int = Field(..., ge=0, le=100)
    flags: List[RuleFlag] = Field(default_factory=list)
    suggested_verdict: VerdictLevel

class GrokVerdict(BaseModel):
    verdict: VerdictLevel
    confidence: int = Field(..., ge=0, le=100)
    reasons: List[str] = Field(default_factory=list, max_length=3)
    advice: str
    scam_type: Optional[str] = None

class FinalVerdictResponse(BaseModel):
    verdict: VerdictLevel
    confidence: int = Field(..., ge=0, le=100)
    reasons: List[str]
    advice: str
    scam_type: Optional[str] = None
    rule_score: int
    flags: List[RuleFlag]
    analysis_mode: str = "hybrid"  # "hybrid" or "rules_only"
    disclaimer: str

class MetadataAnalysis(BaseModel):
    has_exif: bool
    suspicious_tags: List[str] = Field(default_factory=list)
    ai_dimension_match: bool
    dimensions: List[int] = Field(default_factory=list)
    format: str
    mime_type: str
    flags: List[str] = Field(default_factory=list)

class ImageCheckResponse(BaseModel):
    verdict: VerdictLevel
    confidence: int = Field(..., ge=0, le=100)
    reasons: List[str]
    advice: str
    scam_type: Optional[str] = None
    metadata: MetadataAnalysis
    disclaimer: str
