// ==================== Global Search Component ====================
// Cmd+K / Ctrl+K powered search using shadcn Command
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useDebounce, useLocalStorage } from '@/hooks'
import { BookOpen, Calculator, Clock, GraduationCap, Home, MapPin, Search, User, Users, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// ==================== Types ====================
interface SearchResult {
    id: string
    type: 'tuition' | 'tutor' | 'page'
    title: string
    subtitle?: string
    icon?: React.ReactNode
    href: string
}

interface RecentSearch {
    query: string
    timestamp: number
}

// ==================== Static Pages ====================
const STATIC_PAGES: SearchResult[] = [
    { id: 'home', type: 'page', title: 'হোম', href: '/', icon: <Home className="h-4 w-4" /> },
    { id: 'tuitions', type: 'page', title: 'টিউশন খুঁজুন', href: '/tuitions', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'tutors', type: 'page', title: 'টিউটর খুঁজুন', href: '/tutors', icon: <Users className="h-4 w-4" /> },
    { id: 'about', type: 'page', title: 'আমাদের সম্পর্কে', href: '/about', icon: <User className="h-4 w-4" /> },
]

// ==================== Subjects for Quick Filters ====================
const QUICK_FILTERS = [
    { id: 'math', label: 'গণিত', icon: <Calculator className="h-4 w-4" />, href: '/tuitions?subject=math' },
    { id: 'english', label: 'ইংরেজি', icon: <BookOpen className="h-4 w-4" />, href: '/tuitions?subject=english' },
    { id: 'physics', label: 'পদার্থবিজ্ঞান', icon: <GraduationCap className="h-4 w-4" />, href: '/tuitions?subject=physics' },
    { id: 'dhaka', label: 'ঢাকা', icon: <MapPin className="h-4 w-4" />, href: '/tuitions?location=dhaka' },
]

// ==================== GlobalSearch Component ====================
export function GlobalSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300)
    const navigate = useNavigate()

    // Recent searches from localStorage
    const [recentSearches, setRecentSearches] = useLocalStorage<RecentSearch[]>('recent-searches', [])

    // Keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    // Save recent search
    const saveRecentSearch = useCallback(
        (searchQuery: string) => {
            if (!searchQuery.trim()) return

            const newSearch: RecentSearch = {
                query: searchQuery.trim(),
                timestamp: Date.now(),
            }

            setRecentSearches((prev) => {
                // Remove duplicates
                const filtered = prev.filter((s) => s.query.toLowerCase() !== searchQuery.toLowerCase())
                // Keep only last 5
                return [newSearch, ...filtered].slice(0, 5)
            })
        },
        [setRecentSearches]
    )

    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        setRecentSearches([])
    }, [setRecentSearches])

    // Navigate and close
    const handleSelect = useCallback(
        (href: string, searchQuery?: string) => {
            if (searchQuery) {
                saveRecentSearch(searchQuery)
            }
            setOpen(false)
            setQuery('')
            navigate(href)
        },
        [navigate, saveRecentSearch]
    )

    // Search with query
    const handleSearch = useCallback(() => {
        if (query.trim()) {
            saveRecentSearch(query)
            setOpen(false)
            navigate(`/tuitions?search=${encodeURIComponent(query.trim())}`)
            setQuery('')
        }
    }, [query, navigate, saveRecentSearch])

    return (
        <>
            {/* Search Trigger Button */}
            <Button variant="outline" className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2" onClick={() => setOpen(true)}>
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">খুঁজুন...</span>
                <KbdGroup className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:flex">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </Button>

            {/* Command Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="টিউশন, টিউটর, বিষয় খুঁজুন..."
                    value={query}
                    onValueChange={setQuery}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && query.trim()) {
                            handleSearch()
                        }
                    }}
                />
                <CommandList>
                    <CommandEmpty>
                        <Empty className="border-none py-6">
                            <EmptyMedia variant="icon">
                                <Search className="h-6 w-6" />
                            </EmptyMedia>
                            <EmptyHeader>
                                <EmptyTitle>&quot;{query}&quot; পাওয়া যায়নি</EmptyTitle>
                                <EmptyDescription>অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন</EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button variant="outline" size="sm" onClick={handleSearch}>
                                    টিউশন পেজে খুঁজুন
                                </Button>
                            </EmptyContent>
                        </Empty>
                    </CommandEmpty>

                    {/* Recent Searches */}
                    {!debouncedQuery && recentSearches.length > 0 && (
                        <CommandGroup
                            heading={
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Clock className="h-3 w-3" />
                                        সাম্প্রতিক সার্চ
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            clearRecentSearches()
                                        }}
                                    >
                                        <X className="mr-1 h-3 w-3" />
                                        মুছুন
                                    </Button>
                                </div>
                            }
                        >
                            {recentSearches.map((search) => (
                                <CommandItem key={search.timestamp} value={search.query} onSelect={() => handleSelect(`/tuitions?search=${encodeURIComponent(search.query)}`, search.query)}>
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {search.query}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    {/* Quick Filters */}
                    {!debouncedQuery && (
                        <>
                            <CommandSeparator />
                            <CommandGroup heading="দ্রুত ফিল্টার">
                                {QUICK_FILTERS.map((filter) => (
                                    <CommandItem key={filter.id} value={filter.label} onSelect={() => handleSelect(filter.href)}>
                                        {filter.icon}
                                        <span className="ml-2">{filter.label}</span>
                                        <Badge variant="secondary" className="ml-auto">
                                            Filter
                                        </Badge>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

                    {/* Static Pages */}
                    <CommandSeparator />
                    <CommandGroup heading="পেজসমূহ">
                        {STATIC_PAGES.filter((page) => !debouncedQuery || page.title.toLowerCase().includes(debouncedQuery.toLowerCase())).map((page) => (
                            <CommandItem key={page.id} value={page.title} onSelect={() => handleSelect(page.href)}>
                                {page.icon}
                                <span className="ml-2">{page.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    {/* Search Action */}
                    {debouncedQuery && (
                        <>
                            <CommandSeparator />
                            <CommandGroup heading="অ্যাকশন">
                                <CommandItem value={`search-tuitions-${debouncedQuery}`} onSelect={handleSearch}>
                                    <Search className="mr-2 h-4 w-4" />
                                    <span>&quot;{debouncedQuery}&quot; টিউশনে খুঁজুন</span>
                                    <CommandShortcut>↵</CommandShortcut>
                                </CommandItem>
                                <CommandItem
                                    value={`search-tutors-${debouncedQuery}`}
                                    onSelect={() => {
                                        saveRecentSearch(debouncedQuery)
                                        handleSelect(`/tutors?search=${encodeURIComponent(debouncedQuery)}`)
                                    }}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>&quot;{debouncedQuery}&quot; টিউটরে খুঁজুন</span>
                                </CommandItem>
                            </CommandGroup>
                        </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default GlobalSearch
