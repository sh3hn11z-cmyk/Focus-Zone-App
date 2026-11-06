import React, { useState } from 'react';
import { Copy, Check, FileCode, Folder, ChevronRight, Terminal } from 'lucide-react';

interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

const ANDROID_SOURCE_FILES: CodeFile[] = [
  {
    name: 'Color.kt',
    path: 'app/src/main/java/com/example/focuszone_app/ui/theme/Color.kt',
    language: 'kotlin',
    content: `package com.example.focuszone_app.ui.theme

import androidx.compose.ui.graphics.Color

/**
 * Focus Zone AI - Centralized Light Theme Color Palette
 * Exactly calibrated to user UI/UX design specifications.
 */

// Core Design Palette
val MainBackground = Color(0xFFF8F9FC)
val CardBackground = Color(0xFFFFFFFF)
val PrimaryColor = Color(0xFF8B72E8)        // Solid Lavender
val PrimaryButtonText = Color(0xFFFFFFFF)
val HeadingText = Color(0xFF20243A)         // Dark Navy
val SecondaryText = Color(0xFF777D90)       // Soft Grey
val BorderColor = Color(0xFFE8EAF0)
val ProgressIndicator = Color(0xFF9B85F5)   // Lavender Progress Ring
val SuccessColor = Color(0xFF55A987)        // Green Completed Indicator

// Secondary Semantic & Surface Accents
val LavenderSurface = Color(0xFFF3F0FD)
val UserMessageBubble = Color(0xFFF0F2F7)
val AlertWarning = Color(0xFFE69138)
val AlertDanger = Color(0xFFE05353)`,
  },
  {
    name: 'Theme.kt',
    path: 'app/src/main/java/com/example/focuszone_app/ui/theme/Theme.kt',
    language: 'kotlin',
    content: `package com.example.focuszone_app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = PrimaryColor,
    onPrimary = PrimaryButtonText,
    primaryContainer = LavenderSurface,
    onPrimaryContainer = HeadingText,
    secondary = ProgressIndicator,
    onSecondary = PrimaryButtonText,
    background = MainBackground,
    onBackground = HeadingText,
    surface = CardBackground,
    onSurface = HeadingText,
    surfaceVariant = LavenderSurface,
    onSurfaceVariant = SecondaryText,
    outline = BorderColor
)

@Composable
fun FocusZoneTheme(
    content: @Composable () -> Unit
) {
    val colorScheme = LightColorScheme
    val view = LocalView.current

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = MainBackground.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = true
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}`,
  },
  {
    name: 'build.gradle.kts (App)',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.example.focuszone_app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.focuszone_app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    // Jetpack Compose & Material 3
    implementation(platform(libs.androidx.compose.bom))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.navigation:navigation-compose:2.8.5")

    // Room Database
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // Kotlin Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")

    // Networking (Retrofit & OkHttp for FastAPI ML backend)
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-gson:2.11.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Notifications & Foreground Service
    implementation("androidx.core:core-ktx:1.15.0")
}`,
  },
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permissions for Distraction Monitoring & Usage Access -->
    <uses-permission
        android:name="android.permission.PACKAGE_USAGE_STATS"
        tools:ignore="ProtectedPermissions" />
    
    <!-- Permissions for Pomodoro Foreground Service -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <!-- Network permission for FastAPI ML backend -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:name=".FocusZoneApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.FocusZoneAI">

        <activity
            android:name=".ui.MainActivity"
            android:exported="true"
            android:theme="@style/Theme.FocusZoneAI">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Focus Foreground Service -->
        <service
            android:name=".service.FocusForegroundService"
            android:foregroundServiceType="specialUse"
            android:exported="false" />

    </application>
</manifest>`,
  },
  {
    name: 'StudySessionEntity.kt',
    path: 'app/src/main/java/com/example/focuszone_app/data/local/StudySessionEntity.kt',
    language: 'kotlin',
    content: `package com.example.focuszone_app.data.local

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Room Database Entity for Focus Zone AI study sessions.
 * Structured to directly map to the Major Project Dataset Schema.
 */
@Entity(tableName = "study_sessions")
data class StudySessionEntity(
    @PrimaryKey
    @ColumnInfo(name = "session_id")
    val sessionId: String,

    @ColumnInfo(name = "user_id")
    val userId: String,

    @ColumnInfo(name = "subject")
    val subject: String,

    @ColumnInfo(name = "planned_duration")
    val plannedDuration: Int, // in minutes

    @ColumnInfo(name = "actual_duration")
    val actualDuration: Int,  // in minutes

    @ColumnInfo(name = "interruption_count")
    val interruptionCount: Int,

    @ColumnInfo(name = "start_hour")
    val startHour: Int, // 0 - 23

    @ColumnInfo(name = "break_duration")
    val breakDuration: Int, // in minutes

    @ColumnInfo(name = "previous_completion_rate")
    val previousCompletionRate: Float, // 0.0 - 1.0

    @ColumnInfo(name = "study_consistency")
    val studyConsistency: Float,       // 0.0 - 1.0

    @ColumnInfo(name = "day_of_week")
    val dayOfWeek: Int, // 0 = Sunday, 6 = Saturday

    @ColumnInfo(name = "completed")
    val completed: Boolean,

    @ColumnInfo(name = "start_time")
    val startTime: String, // ISO timestamp

    @ColumnInfo(name = "end_time")
    val endTime: String
)`,
  },
  {
    name: 'TimerViewModel.kt',
    path: 'app/src/main/java/com/example/focuszone_app/ui/viewmodels/TimerViewModel.kt',
    language: 'kotlin',
    content: `package com.example.focuszone_app.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.focuszone_app.data.local.StudySessionEntity
import com.example.focuszone_app.data.repository.StudyRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.time.Instant
import java.util.Calendar
import java.util.UUID

data class TimerUiState(
    val isRunning: Boolean = false,
    val secondsRemaining: Int = 25 * 60,
    val totalSeconds: Int = 25 * 60,
    val mode: TimerMode = TimerMode.STUDY,
    val interruptionCount: Int = 0,
    val subject: String = "Machine Learning"
)

enum class TimerMode { STUDY, SHORT_BREAK, LONG_BREAK }

class TimerViewModel(
    private val repository: StudyRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(TimerUiState())
    val uiState: StateFlow<TimerUiState> = _uiState.asStateFlow()

    private var timerJob: Job? = null
    private var sessionStartTime: String? = null

    fun startTimer() {
        if (_uiState.value.isRunning) return
        if (sessionStartTime == null) {
            sessionStartTime = Instant.now().toString()
        }

        _uiState.update { it.copy(isRunning = true) }
        timerJob = viewModelScope.launch {
            while (_uiState.value.secondsRemaining > 0 && _uiState.value.isRunning) {
                delay(1000L)
                _uiState.update { it.copy(secondsRemaining = it.secondsRemaining - 1) }
            }
            if (_uiState.value.secondsRemaining == 0) {
                onSessionCompleted()
            }
        }
    }

    fun pauseTimer() {
        timerJob?.cancel()
        _uiState.update { it.copy(isRunning = false) }
    }

    fun recordInterruption() {
        _uiState.update { it.copy(interruptionCount = it.interruptionCount + 1) }
    }

    private fun onSessionCompleted() {
        pauseTimer()
        val state = _uiState.value
        val plannedMins = state.totalSeconds / 60
        val actualMins = (state.totalSeconds - state.secondsRemaining) / 60

        val calendar = Calendar.getInstance()
        val session = StudySessionEntity(
            sessionId = UUID.randomUUID().toString(),
            userId = "usr_01",
            subject = state.subject,
            plannedDuration = plannedMins,
            actualDuration = actualMins,
            interruptionCount = state.interruptionCount,
            startHour = calendar.get(Calendar.HOUR_OF_DAY),
            breakDuration = 5,
            previousCompletionRate = 0.85f,
            studyConsistency = 0.82f,
            dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1,
            completed = true,
            startTime = sessionStartTime ?: Instant.now().toString(),
            endTime = Instant.now().toString()
        )

        viewModelScope.launch {
            repository.saveSession(session)
        }
    }
}`,
  },
];

export const AndroidCodeBrowser: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(ANDROID_SOURCE_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E8EAF0] shadow-xs overflow-hidden flex flex-col md:flex-row h-[620px]">
      {/* File Tree Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8EAF0] bg-[#F8F9FC] p-3 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-[#20243A] mb-2">
          <Folder className="w-4 h-4 text-[#8B72E8]" />
          <span>Android Project Tree</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {ANDROID_SOURCE_FILES.map((file) => {
            const isSelected = selectedFile.name === file.name;

            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B72E8] text-white font-semibold shadow-xs'
                    : 'text-[#777D90] hover:bg-white hover:text-[#20243A]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-[#E8EAF0] px-2 text-[10px] text-[#777D90]">
          Package: <code className="text-[#8B72E8] font-mono">com.example.focuszone_app</code>
        </div>
      </div>

      {/* Code Editor Pane */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Editor Tab Bar */}
        <div className="h-11 px-4 bg-[#F8F9FC] border-b border-[#E8EAF0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B72E8] font-semibold">
            <Terminal className="w-4 h-4" />
            <span>{selectedFile.path}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-white border border-[#E8EAF0] text-[#777D90] hover:text-[#20243A] hover:border-[#8B72E8]/40 shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#55A987]" />
                <span className="text-[#55A987]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <pre className="flex-1 overflow-auto p-4 text-xs font-mono text-[#20243A] leading-relaxed bg-white">
          <code>{selectedFile.content}</code>
        </pre>
      </div>
    </div>
  );
};
