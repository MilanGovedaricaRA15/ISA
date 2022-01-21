package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Report;

import java.util.List;

public interface ReportService {
    public List<Report> getAllReports();
    public Boolean changeVerified(Long id);
    public Boolean deleteReport(Long id);
}
